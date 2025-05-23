import type { NextRequest } from 'next/server';
import { urlLocaleMiddleware } from '~/url-locale-middleware';

export const middleware = (request: NextRequest) => {
    return urlLocaleMiddleware(request);
};

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
};