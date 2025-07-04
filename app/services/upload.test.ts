import { createHash } from 'crypto';

import { errors } from '~/constants/errors';

import { CONTAINER_NAME } from '~/constants';
import logger from '~/middleware/logger/logger';
import { azureStorageService } from '~/services/upload';

const mockUploadData = jest.fn();
const mockDeleteIfExists = jest.fn();
const mockExists = jest.fn();
const mockFetch = jest.fn();
const mockResponse = jest.fn((body, init) => ({ body, ...init, isMocked: true }));
const mockSetHeader = jest.fn();
const mockHeaders = jest.fn().mockImplementation(() => ({
  set: mockSetHeader,
  get: jest.fn(),
  has: jest.fn()
}));

global.fetch = mockFetch;
global.Response = mockResponse;
global.Headers = mockHeaders;

const MOCK_AZURE_SAS_URL = 'url-test';
process.env.AZURE_SAS_URL = MOCK_AZURE_SAS_URL;

jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: jest.fn().mockImplementation(() => ({
      getContainerClient: jest.fn(() => ({
        getBlockBlobClient: jest.fn((path: string) => ({
          uploadData: mockUploadData,
          deleteIfExists: mockDeleteIfExists,
          exists: mockExists,
          url: `https://mockstorage.blob.core.windows.net/${CONTAINER_NAME}/${path}`
        }))
      }))
    }))
  };
});

jest.mock('~/validators/blob.schema', () => ({
  zFolderNameSchema: { parse: jest.fn() },
  zContentTypeSchema: { parse: jest.fn() }
}));

jest.mock('~/middleware/logger/logger', () => ({
  error: jest.fn(),
  warning: jest.fn()
}));

describe('azureStorageService', () => {
  const folderName = 'photos';
  const blobName = 'image.jpg';
  const buffer = Buffer.from('mock buffer');
  const contentType = 'image/jpeg';
  const fullPath = `${folderName}/${createHash('sha256').update(blobName).digest('hex')}`;
  const expectedUrl = `https://mockstorage.blob.core.windows.net/${CONTAINER_NAME}/${fullPath}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should upload file successfully', async () => {
      await expect(azureStorageService.uploadFile(folderName, blobName, buffer, contentType)).resolves.toBeUndefined();
      expect(mockUploadData).toHaveBeenCalledWith(buffer, {
        blobHTTPHeaders: { blobContentType: contentType }
      });
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should throw an error and log it if upload fails', async () => {
      const uploadError = new Error('Azure network error');
      mockUploadData.mockRejectedValue(uploadError);
      await expect(azureStorageService.uploadFile(folderName, blobName, buffer, contentType)).rejects.toThrow(
        uploadError
      );
      expect(logger.error).toHaveBeenCalledWith(errors.FAILED_TO_UPLOAD_BLOB, uploadError);
    });
  });

  describe('deleteFile', () => {
    it('should delete file successfully', async () => {
      await expect(azureStorageService.deleteFile(folderName, blobName)).resolves.toBeUndefined();
      expect(mockDeleteIfExists).toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should throw an error and log it if deletion fails', async () => {
      const deleteError = new Error('Azure permission error');
      mockDeleteIfExists.mockRejectedValue(deleteError);
      await expect(azureStorageService.deleteFile(folderName, blobName)).rejects.toThrow(deleteError);
      expect(logger.error).toHaveBeenCalledWith(errors.FAILED_TO_DELETE_BLOB, deleteError);
    });
  });

  describe('constructBlobUrl', () => {
    it('should return the full, correctly formatted URL without checking for existence', () => {
      const url = azureStorageService.constructBlobUrl(folderName, blobName);
      expect(url).toBe(expectedUrl);
      expect(mockExists).not.toHaveBeenCalled();
    });
  });

  describe('streamBlob', () => {
    const mockUrl = 'https://fake-url.com/file.mp3';

    beforeEach(() => {
      mockFetch.mockClear();
      mockResponse.mockClear();
      mockSetHeader.mockClear();
    });

    it('should call fetch and construct a new Response for a full request', async () => {
      const fakeBody = 'audio data';
      const mockAzureHeaders = {
        get: jest.fn((key: string) => {
          if (key === 'Content-Type') return 'audio/mpeg';
          if (key === 'Content-Length') return '1234567';
          return null;
        }),
        has: jest.fn().mockReturnValue(false)
      };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: mockAzureHeaders,
        body: fakeBody
      });

      const result = await azureStorageService.streamBlob(mockUrl, null);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        method: 'GET',
        headers: {},
        next: { revalidate: 0 }
      });
      expect(mockResponse).toHaveBeenCalledTimes(1);
      expect(mockResponse).toHaveBeenCalledWith(fakeBody, {
        status: 200,
        statusText: undefined,
        headers: expect.any(Object)
      });
      expect(result.status).toBe(200);
    });

    it('should handle range requests and construct a 206 Partial Content response', async () => {
      const fakeBody = 'partial audio data';
      const mockAzureHeaders = {
        get: jest.fn((key: string) => {
          const headersMap = {
            'Content-Type': 'audio/mpeg',
            'Content-Length': '500000',
            'Content-Range': 'bytes 500000-999999/1000000'
          };
          return headersMap[key as keyof typeof headersMap] || null;
        }),
        has: jest.fn((key: string) => key === 'Content-Range')
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 206,
        headers: mockAzureHeaders,
        body: fakeBody
      });

      const rangeHeader = 'bytes=500000-';

      await azureStorageService.streamBlob(mockUrl, rangeHeader);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        method: 'GET',
        headers: { Range: rangeHeader },
        next: { revalidate: 0 }
      });
      expect(mockResponse).toHaveBeenCalledWith(fakeBody, {
        status: 206,
        statusText: undefined,
        headers: expect.any(Object)
      });
      expect(mockSetHeader).toHaveBeenCalledWith('Content-Type', 'audio/mpeg');
      expect(mockSetHeader).toHaveBeenCalledWith('Content-Length', '500000');
      expect(mockSetHeader).toHaveBeenCalledWith('Content-Range', 'bytes 500000-999999/1000000');
      expect(mockSetHeader).toHaveBeenCalledWith('Accept-Ranges', 'bytes');
      expect(mockSetHeader).toHaveBeenCalledWith('Cache-Control', expect.any(String));
    });

    it('should return the original error response from fetch without constructing a new one', async () => {
      const mockErrorBody = 'Not found';
      const mockErrorResponseFromFetch = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        body: mockErrorBody
      };
      mockFetch.mockResolvedValue(mockErrorResponseFromFetch);

      await azureStorageService.streamBlob(mockUrl, null);

      expect(mockResponse).toHaveBeenCalledTimes(1);
      expect(mockResponse).toHaveBeenCalledWith(mockErrorBody, {
        status: 404,
        statusText: 'Not Found'
      });
    });

    it('should throw an error if fetch itself fails', async () => {
      const networkError = new Error('DNS resolution failed');
      mockFetch.mockRejectedValue(networkError);
      await expect(azureStorageService.streamBlob(mockUrl, null)).rejects.toThrow(networkError);
      expect(mockResponse).not.toHaveBeenCalled();
    });
  });
});
