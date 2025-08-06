import { cookies, draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { baseUrl } from '~/config';
import { errorResponse } from '~/lib/utils/apiResponse';
import { corsError, withCORS } from '~/lib/utils/cors';
import { verifyAuthToken } from '~/lib/utils/verifyAuthToken';

export async function GET(request: Request) {
  const origin = request.headers.get('origin') || '*';

  const cookieStore = await cookies();
  const tokenFromCookies = cookieStore.get('accessToken')?.value;

  if (!tokenFromCookies) {
    return corsError(origin, errorResponse([errors.MISSING_AUTH_TOKEN], 401));
  }

  const user = verifyAuthToken(tokenFromCookies);

  if (!user) {
    return corsError(origin, errorResponse([errors.INVALID_TOKEN], 401));
  }

  if (user.type !== 'admin' && user.type !== 'superadmin') {
    return corsError(origin, errorResponse([errors.ACCESS_DENIED], 403));
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const lang = searchParams.get('lang');
  const draftId = searchParams.get('draftId');

  if (!slug || !lang) {
    return corsError(origin, errorResponse([errors.MISSING_PARAMETERS], 400));
  }

  const draft = await draftMode();
  draft.enable();

  const url = new URL(`/${lang}/${slug}`, baseUrl);
  if (draftId) {
    url.searchParams.set('draftId', draftId);
  }

  const response = NextResponse.json({ previewUrl: url.toString() });

  response.headers.set('Cache-Control', 'no-store');

  withCORS(origin, response);
  return response;
}
