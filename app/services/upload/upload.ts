import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob';
import { createHash } from 'node:crypto';
import { ZodError } from 'zod';

import { errors } from '~/constants/errors';

import { CONTAINER_NAME } from '~/constants';
import logger from '~/middleware/logger/logger';
import { zContentTypeSchema, zFolderNameSchema } from '~/validators/blob.schema';

export const createAzureStorageService = () => {
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
    constructBlobUrl: (folderName: string, blobName: string): string => {
      try {
        zFolderNameSchema.parse(folderName);
        if (blobName.startsWith('https://')) {
          return blobName;
        }
        const blobNameHash = createHash('sha256').update(blobName).digest('hex');
        const containerClient = getContainerClient();
        const blockBlobClient = getFullPathToBlob(containerClient, folderName, blobNameHash);
        return blockBlobClient.url;
      } catch (error) {
        const logMessage =
          error instanceof ZodError ? 'Validation failed for blob path config' : errors.BLOB_DOES_NOT_EXIST;
        logger.error(`[AzureStorage:constructBlobUrl] ${logMessage}`, error);
        throw error;
      }
    },
    streamBlob: async (url: string, rangeHeader: string | null): Promise<Response> => {
      try {
        const azureResponse = await fetch(url, {
          method: 'GET',
          headers: rangeHeader ? { Range: rangeHeader } : {},
          next: { revalidate: 0 }
        });

        if (!azureResponse.ok) {
          logger.error(`[AzureStorage:streamBlob] Azure responded with error: ${azureResponse.status}`);
          return new Response(azureResponse.body, {
            status: azureResponse.status,
            statusText: azureResponse.statusText
          });
        }

        const headers = new Headers();
        headers.set('Content-Type', azureResponse.headers.get('Content-Type') ?? 'application/octet-stream');
        headers.set('Content-Length', azureResponse.headers.get('Content-Length') ?? '');
        if (azureResponse.headers.has('Content-Range')) {
          headers.set('Content-Range', azureResponse.headers.get('Content-Range')!);
        }
        headers.set('Accept-Ranges', 'bytes');
        headers.set('Cache-Control', 'public, max-age=604800, immutable');

        return new Response(azureResponse.body, {
          status: azureResponse.status,
          statusText: azureResponse.statusText,
          headers
        });
      } catch (error) {
        logger.error('[AzureStorage:streamBlob] Critical network failure while streaming from Azure:', error);
        throw error;
      }
    }
  };
};
