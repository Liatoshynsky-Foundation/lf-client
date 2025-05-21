import type { NextRequest } from 'next/server';
import { localBasedUrlMiddleware } from '~/local-based-url-middleware';

export const middleware = (request: NextRequest) => {
    return localBasedUrlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|.next/static).*)',
    ],
};