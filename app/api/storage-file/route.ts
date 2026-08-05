import { errors } from '~/constants/errors';
import { errorResponse } from '~/utils/apiResponse';
import { validateWithZod } from '~/utils/validateRequestData';

import logger from '~/middleware/logger/logger';
import { zStorageFileQuerySchema } from '~/validators/queryParams.schema';

const STORAGE_CACHE_CONTROL = 'public, max-age=604800, immutable';
const ERROR_CACHE_CONTROL = 'no-store';

const copyHeader = (source: Headers, target: Headers, name: string) => {
  const value = source.get(name);
  if (value) {
    target.set(name, value);
  }
};

const getCacheControl = (status: number) =>
  status === 200 || status === 206 ? STORAGE_CACHE_CONTROL : ERROR_CACHE_CONTROL;

const getStorageBaseUrl = () => process.env.STORAGE_BASE_URL ?? process.env.NEXT_PUBLIC_STORAGE_BASE_URL;

const buildStorageUrl = (folderName: string, fileName: string) => {
  const storageBaseUrl = getStorageBaseUrl();
  if (!storageBaseUrl) {
    throw new Error(errors.STORAGE_BASE_URL_NOT_DEFINED);
  }

  const storageUrl = new URL(storageBaseUrl);
  storageUrl.pathname = [storageUrl.pathname.replace(/\/$/, ''), folderName, encodeURIComponent(fileName)]
    .filter(Boolean)
    .join('/');

  return storageUrl.toString();
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validationResult = validateWithZod(
    {
      fileName: searchParams.get('fileName'),
      folderName: searchParams.get('folderName')
    },
    zStorageFileQuerySchema
  );

  if (!validationResult.valid) return errorResponse(validationResult.errors);

  try {
    const rangeHeader = request.headers.get('range');
    const storageResponse = await fetch(
      buildStorageUrl(validationResult.value.folderName, validationResult.value.fileName),
      {
        method: 'GET',
        headers: rangeHeader ? { Range: rangeHeader } : {},
        next: { revalidate: 0 }
      }
    );

    const headers = new Headers();
    copyHeader(storageResponse.headers, headers, 'Content-Type');
    copyHeader(storageResponse.headers, headers, 'Content-Length');
    copyHeader(storageResponse.headers, headers, 'Content-Range');
    headers.set('Accept-Ranges', storageResponse.headers.get('Accept-Ranges') ?? 'bytes');
    headers.set('Cache-Control', getCacheControl(storageResponse.status));

    return new Response(storageResponse.body, {
      status: storageResponse.status,
      statusText: storageResponse.statusText,
      headers
    });
  } catch (error) {
    logger.error('[API:GET:storage-file] Failed to stream file from R2', error);
    return Response.json({ message: 'Failed to stream file from storage' }, { status: 502 });
  }
}
