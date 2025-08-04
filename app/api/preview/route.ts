import { cookies, draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { errorResponse } from '~/lib/utils/apiResponse';
import { verifyAuthToken } from '~/lib/utils/verifyAuthToken';

function setCORSHeaders(origin: string, response: NextResponse) {
  if (origin && origin !== '*') {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}

function corsErrorResponse(origin: string, response: NextResponse) {
  return setCORSHeaders(origin, response);
}

export async function GET(request: Request) {
  const origin = request.headers.get('origin') || '*';

  const cookieStore = await cookies();
  const tokenFromCookies = cookieStore.get('accessToken')?.value;

  if (!tokenFromCookies) {
    return corsErrorResponse(origin, errorResponse([errors.MISSING_AUTH_HEADER], 401));
  }

  const user = verifyAuthToken(tokenFromCookies);

  if (!user) {
    return corsErrorResponse(origin, errorResponse([errors.INVALID_TOKEN], 401));
  }

  if (user.type !== 'admin' && user.type !== 'superadmin') {
    return corsErrorResponse(origin, errorResponse([errors.ACCESS_DENIED], 403));
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const lang = searchParams.get('lang');
  const draftId = searchParams.get('draftId');

  if (!slug || !lang) {
    return corsErrorResponse(origin, errorResponse([errors.MISSING_PARAMETERS], 400));
  }

  const draft = await draftMode();
  draft.enable();

  const baseUrl = 'http://dev.lf.com:3001';
  const url = new URL(`/${lang}/${slug}`, baseUrl);
  if (draftId) {
    url.searchParams.set('draftId', draftId);
  }

  const response = NextResponse.json({ previewUrl: url.toString() });

  response.headers.set('Cache-Control', 'no-store');

  setCORSHeaders(origin, response);
  return response;
}
