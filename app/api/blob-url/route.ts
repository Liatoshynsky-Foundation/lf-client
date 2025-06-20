import { NextResponse } from 'next/server';

import { errorResponse } from '~/utils/apiResponse';
import { validateWithZod } from '~/utils/validateRequestData';

import { azureStorageService } from '~/services/upload';
import { blobQuerySchema } from '~/validators/blob.schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validationResult = validateWithZod(
    {
      blobName: searchParams.get('blobName'),
      folderName: searchParams.get('folderName')
    },
    blobQuerySchema
  );

  if (!validationResult.valid) {
    return errorResponse(validationResult.errors);
  }

  const { blobName, folderName } = validationResult.value;
  const url = azureStorageService.getBlobUrl(folderName, blobName);
  const response = await fetch(url);
  const contentType = response.headers.get('content-type') ?? 'image/jpg';
  const buffer = await response.arrayBuffer();

  return new NextResponse(Buffer.from(buffer), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000'
    }
  });
}
