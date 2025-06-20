import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob';

import { azureBlobStorageUrl } from '~/config';
import { CONTAINER_NAME } from '~/constants';
import { zContentTypeSchema, zFolderNameSchema } from '~/validators/blob.schema';

export const azureStorageService = (() => {
  const blobServiceClient = new BlobServiceClient(azureBlobStorageUrl);

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
      zFolderNameSchema.parse(folderName);
      zContentTypeSchema.parse(contentType);
      const containerClient = getContainerClient();
      const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobName);
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: contentType }
      });
    },
    deleteFile: async (folderName: string, blobName: string): Promise<void> => {
      zFolderNameSchema.parse(folderName);
      const containerClient = getContainerClient();
      const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobName);
      await blockBlobClient.deleteIfExists();
    },
    getBlobUrl: (folderName: string, blobName: string): string => {
      zFolderNameSchema.parse(folderName);
      const containerClient = getContainerClient();
      return getFullPathToBlob(containerClient, folderName, blobName).url;
    }
  };
})();
