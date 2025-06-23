import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob';

import { errors } from '~/constants/errors';

import { CONTAINER_NAME } from '~/constants';
import logger from '~/middleware/logger/logger';
import { zContentTypeSchema, zFolderNameSchema } from '~/validators/blob.schema';
import { env } from '~/validators/env/azure.schema';

export const azureStorageService = (() => {
  const blobServiceClient = new BlobServiceClient(env.AZURE_SAS_URL);

  const getContainerClient = (): ContainerClient => {
    return blobServiceClient.getContainerClient(CONTAINER_NAME);
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
        const containerClient = getContainerClient();
        const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobName);
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
        const containerClient = getContainerClient();
        const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobName);
        await blockBlobClient.deleteIfExists();
      } catch (error) {
        logger.error(errors.FAILED_TO_DELETE_BLOB, error);
        throw error;
      }
    },
    checkBlobExists: async (folderName: string, blobName: string): Promise<boolean> => {
      try {
        zFolderNameSchema.parse(folderName);
        const containerClient = getContainerClient();
        const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobName);
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
        const containerClient = getContainerClient();
        return getFullPathToBlob(containerClient, folderName, blobName).url;
      }
      return '';
    }
  };
})();
