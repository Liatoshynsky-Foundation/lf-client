import type { NextRequest } from 'next/server';
import { localBasedUrlMiddleware } from '~/local-based-url-middleware';

export function middleware (request: NextRequest) {
    return localBasedUrlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|.next/static).*)',
    ],
};