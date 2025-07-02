import { createHash } from 'crypto';

import { errors } from '~/constants/errors';

import { CONTAINER_NAME } from '~/constants';
import logger from '~/middleware/logger/logger';
import { azureStorageService } from '~/services/upload';
const mockUploadData = jest.fn();
const mockDeleteIfExists = jest.fn();
const mockExists = jest.fn();

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

  describe('checkBlobExists', () => {
    it('should return true if blob exists', async () => {
      mockExists.mockResolvedValue(true);
      const result = await azureStorageService.checkBlobExists(folderName, blobName);
      expect(result).toBe(true);
      expect(mockExists).toHaveBeenCalled();
      expect(logger.warning).not.toHaveBeenCalled();
    });

    it('should return false if blob does not exist', async () => {
      mockExists.mockResolvedValue(false);
      const result = await azureStorageService.checkBlobExists(folderName, blobName);
      expect(result).toBe(false);
      expect(mockExists).toHaveBeenCalled();
      expect(logger.warning).not.toHaveBeenCalled();
    });

    it('should return false and log a warning if checking fails', async () => {
      const checkError = new Error('SDK error');
      mockExists.mockRejectedValue(checkError);
      const result = await azureStorageService.checkBlobExists(folderName, blobName);
      expect(result).toBe(false);
      expect(logger.warning).toHaveBeenCalledWith(errors.BLOB_DOES_NOT_EXIST, checkError);
    });
  });

  describe('getBlobUrl', () => {
    it('should return the full URL if blob exists', async () => {
      mockExists.mockResolvedValue(true);
      const url = await azureStorageService.getBlobUrl(folderName, blobName);
      expect(url).toBe(expectedUrl);
      expect(mockExists).toHaveBeenCalled();
    });

    it('should return an empty string if blob does not exist', async () => {
      mockExists.mockResolvedValue(false);
      const url = await azureStorageService.getBlobUrl(folderName, blobName);
      expect(url).toBe('');
      expect(mockExists).toHaveBeenCalled();
    });

    it('should return an empty string if checking for existence fails', async () => {
      mockExists.mockRejectedValue(new Error('Network failure'));
      const url = await azureStorageService.getBlobUrl(folderName, blobName);
      expect(url).toBe('');
      expect(mockExists).toHaveBeenCalled();
      expect(logger.warning).toHaveBeenCalled();
    });
  });
});
