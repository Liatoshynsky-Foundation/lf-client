import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '~/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hasDraftId = request.nextUrl.searchParams.has('draftId');
  const isDraftModeEnabled = request.cookies.has('__prerender_bypass');

  if (!hasDraftId && isDraftModeEnabled) {
    const returnUrl = request.nextUrl.clone();
    const disableUrl = new URL('/api/preview/disable', request.url);
    disableUrl.searchParams.set('returnTo', `${returnUrl.pathname}${returnUrl.search}`);

    return NextResponse.redirect(disableUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|.*\\.[^/]+$).*)'
};
