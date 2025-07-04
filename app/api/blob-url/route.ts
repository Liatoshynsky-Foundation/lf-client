import { errors } from '~/constants/errors';
import { errorResponse } from '~/utils/apiResponse';
import { validateWithZod } from '~/utils/validateRequestData';

import logger from '~/middleware/logger/logger';
import { azureStorageService } from '~/services/upload';
import { zBlobQuerySchema } from '~/validators/blob.schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validationResult = validateWithZod(
    {
      blobName: searchParams.get('blobName'),
      folderName: searchParams.get('folderName')
    },
    zBlobQuerySchema
  );

  if (!validationResult.valid) return errorResponse(validationResult.errors);

  const { blobName, folderName } = validationResult.value;
  try {
    const url = azureStorageService.constructBlobUrl(folderName, blobName);
    const rangeHeader = request.headers.get('range');
    const azureResponse = await fetch(url, {
      method: 'GET',
      headers: rangeHeader ? { Range: rangeHeader } : {},
      next: { revalidate: 0 }
    });

    if (!azureResponse.ok) {
      return new Response(azureResponse.body, {
        status: azureResponse.status,
        statusText: azureResponse.statusText
      });
    }

    const headers = new Headers();

    headers.set('Content-Type', azureResponse.headers.get('Content-Type') || 'application/octet-stream');
    headers.set('Content-Length', azureResponse.headers.get('Content-Length') || '');
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
    logger.error('Blob proxy failed:', error);
    return errorResponse([errors.AZURE_URL_NOT_DEFINED], 503);
  }
}
