import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';
import { errorResponse } from '~/utils/apiResponse';
import { validateWithZod } from '~/utils/validateRequestData';

import { createRequestContainer } from '~/di/container';
import { zPageQuerySchema } from '~/validators/queryParams.schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validationResult = validateWithZod(
    {
      pageName: searchParams.get('pageName'),
      lang: searchParams.get('lang')
    },
    zPageQuerySchema
  );
  if (!validationResult.valid) return errorResponse(validationResult.errors);
  const { pageName, lang } = validationResult.value;
  const pagesDataService = createRequestContainer().resolve('pageService');
  const pageData = await pagesDataService.getPageData(pageName, lang);
  if (!pageData) return errorResponse([errors.NOT_FOUND], 404);
  return NextResponse.json(pageData);
}
