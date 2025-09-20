import { errors } from '~/constants/errors';
import { errorResponse } from '~/utils/apiResponse';
import { validateWithZod } from '~/utils/validateRequestData';

import { createRequestContainer } from '~/di/container';
import logger from '~/middleware/logger/logger';
import { zBlobQuerySchema } from '~/validators/queryParams.schema';

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
    const uploadService = createRequestContainer().resolve('uploadService');
    const url = uploadService.constructBlobUrl(folderName, blobName);
    const rangeHeader = request.headers.get('range');
    return await uploadService.streamBlob(url, rangeHeader);
  } catch (error) {
    logger.error('Blob proxy failed:', error);
    return errorResponse([errors.AZURE_URL_NOT_DEFINED], 503);
  }
}
