import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { previewSecret } from '~/config';
import { errorResponse } from '~/lib/utils/apiResponse';
import { getTokenFromHeader } from '~/lib/utils/getTokenFromHeader';
import { verifyToken } from '~/lib/utils/verifyToken';

export async function GET(request: Request) {
  const tokenFromHeader = getTokenFromHeader(request);
  if (!tokenFromHeader) {
    return errorResponse([errors.MISSING_AUTH_HEADER], 401);
  }

  const user = verifyToken(tokenFromHeader);
  if (!user) {
    return errorResponse([errors.INVALID_TOKEN], 401);
  }

  if (user.type !== 'admin' && user.type !== 'superadmin') {
    return errorResponse([errors.ACCESS_DENIED], 403);
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const token = searchParams.get('previewToken');
  const lang = searchParams.get('lang');
  const draftId = searchParams.get('draftId');

  if (!slug || !token || !lang) {
    return errorResponse([errors.MISSING_PARAMETERS], 400);
  }

  const VALID_TOKEN = previewSecret;

  if (token !== VALID_TOKEN) {
    return errorResponse([errors.INVALID_PREVIEW_TOKEN], 401);
  }

  const draft = await draftMode();
  draft.enable();

  const baseUrl = new URL(request.url).origin;
  const url = new URL(`/${lang}/${slug}`, baseUrl);

  if (draftId) {
    url.searchParams.set('draftId', draftId);
  }

  const response = NextResponse.redirect(url, 307);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  return response;
}
