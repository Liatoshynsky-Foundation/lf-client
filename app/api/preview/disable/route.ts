import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

import { errors } from '~/constants/errors';

import { baseUrl } from '~/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const returnTo = searchParams.get('returnTo') || '/';

  if (!returnTo.startsWith('/') || returnTo.startsWith('//')) {
    return NextResponse.json({ success: false, error: errors.INVALID_RETURN_URL }, { status: 400 });
  }

  if (!baseUrl) {
    throw new Error('BASE_URL is not configured');
  }

  const redirectUrl = new URL(returnTo, baseUrl);

  if (redirectUrl.origin !== new URL(baseUrl).origin) {
    return NextResponse.json({ success: false, error: errors.INVALID_RETURN_URL }, { status: 400 });
  }

  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(redirectUrl);
}
