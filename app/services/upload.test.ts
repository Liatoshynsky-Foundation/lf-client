import { CONTAINER_NAME } from '~/constants';
import { azureStorageService } from '~/services/upload';

jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: jest.fn().mockImplementation(() => ({
      getContainerClient: jest.fn(() => ({
        getBlockBlobClient: jest.fn((path: string) => ({
          uploadData: jest.fn(),
          deleteIfExists: jest.fn(),
          url: `https://mockstorage.blob.core.windows.net/${CONTAINER_NAME}/${path}`
        }))
      }))
    }))
  };
});

jest.mock('~/validators/env.schema', () => ({
  env: {
    STORAGE_ACCOUNT: 'mockstorage',
    SAS_TOKEN: 'mocktoken'
  }
}));

jest.mock('~/validators/blob.schema', () => ({
  zFolderNameSchema: { parse: jest.fn() },
  zContentTypeSchema: { parse: jest.fn() }
}));

describe('azureStorageService', () => {
  const folderName = 'photos';
  const blobName = 'image.jpg';
  const buffer = Buffer.from('mock buffer');
  const contentType = 'image/jpeg';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload file with correct args', async () => {
    await expect(azureStorageService.uploadFile(folderName, blobName, buffer, contentType)).resolves.toBeUndefined();
  });

  it('should delete file with correct args', async () => {
    await expect(azureStorageService.deleteFile(folderName, blobName)).resolves.toBeUndefined();
  });

  it('should return correct blob url', () => {
    const url = azureStorageService.getBlobUrl(folderName, blobName);
    expect(url).toBe(`https://mockstorage.blob.core.windows.net/${CONTAINER_NAME}/${folderName}/${blobName}`);
  });
});
