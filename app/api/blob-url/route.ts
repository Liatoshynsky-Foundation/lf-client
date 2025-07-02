import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';
import { errorResponse } from '~/utils/apiResponse';
import { validateWithZod } from '~/utils/validateRequestData';

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
  let url;
  try {
    url = await azureStorageService.getBlobUrl(folderName, blobName);
    if (!url) return errorResponse([errors.BLOB_DOES_NOT_EXIST], 404);
  } catch {
    return errorResponse([errors.AZURE_URL_NOT_DEFINED], 503);
  }

  const azureResponse = await fetch(url);
  const stream = azureResponse.body;
  const contentType = azureResponse.headers.get('content-type') ?? 'application/octet-stream';

  return new NextResponse(stream, {
    headers: {
      'Content-Type': contentType,
      'Content-Length': azureResponse.headers.get('content-length') ?? '',
      'Cache-Control': 'public, max-age=31536000'
    }
  });
}
