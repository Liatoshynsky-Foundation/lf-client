import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob';
import { createHash } from 'crypto';

import { errors } from '~/constants/errors';

import { CONTAINER_NAME } from '~/constants';
import logger from '~/middleware/logger/logger';
import { zContentTypeSchema, zFolderNameSchema } from '~/validators/blob.schema';

export const azureStorageService = (() => {
  let blobServiceClient: BlobServiceClient | null = null;

  const getClient = (): BlobServiceClient => {
    if (blobServiceClient) {
      return blobServiceClient;
    }
    const { AZURE_SAS_URL } = process.env;
    if (!AZURE_SAS_URL) {
      throw new Error(errors.AZURE_URL_NOT_DEFINED);
    }
    blobServiceClient = new BlobServiceClient(AZURE_SAS_URL);
    return blobServiceClient;
  };

  const getContainerClient = (): ContainerClient => {
    return getClient().getContainerClient(CONTAINER_NAME);
  };

  const getFullPathToBlob = (
    containerClient: ContainerClient,
    folderName: string,
    blobName: string
  ): BlockBlobClient => {
    return containerClient.getBlockBlobClient(`${folderName}/${blobName}`);
  };

  return {
    uploadFile: async (folderName: string, blobName: string, buffer: Buffer, contentType?: string): Promise<void> => {
      try {
        zFolderNameSchema.parse(folderName);
        zContentTypeSchema.parse(contentType);
        const blobNameHash = createHash('sha256').update(blobName).digest('hex');
        const containerClient = getContainerClient();
        const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobNameHash);
        await blockBlobClient.uploadData(buffer, {
          blobHTTPHeaders: { blobContentType: contentType }
        });
      } catch (error) {
        logger.error(errors.FAILED_TO_UPLOAD_BLOB, error);
        throw error;
      }
    },
    deleteFile: async (folderName: string, blobName: string): Promise<void> => {
      try {
        zFolderNameSchema.parse(folderName);
        const blobNameHash = createHash('sha256').update(blobName).digest('hex');
        const containerClient = getContainerClient();
        const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobNameHash);
        await blockBlobClient.deleteIfExists();
      } catch (error) {
        logger.error(errors.FAILED_TO_DELETE_BLOB, error);
        throw error;
      }
    },
    checkBlobExists: async (folderName: string, blobName: string): Promise<boolean> => {
      try {
        zFolderNameSchema.parse(folderName);
        const blobNameHash = createHash('sha256').update(blobName).digest('hex');
        const containerClient = getContainerClient();
        const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobNameHash);
        return await blockBlobClient.exists();
      } catch (error) {
        logger.warning(errors.BLOB_DOES_NOT_EXIST, error);
        return false;
      }
    },
    getBlobUrl: async (folderName: string, blobName: string): Promise<string> => {
      const exist = await azureStorageService.checkBlobExists(folderName, blobName);
      if (exist) {
        zFolderNameSchema.parse(folderName);
        const blobNameHash = createHash('sha256').update(blobName).digest('hex');
        const containerClient = getContainerClient();
        return getFullPathToBlob(containerClient, folderName, blobNameHash).url;
      }
      return '';
    }
  };
})();
