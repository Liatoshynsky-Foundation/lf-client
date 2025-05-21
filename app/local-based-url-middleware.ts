import {
    type NextRequest,
    NextResponse
} from 'next/server';
import {
    DEFAULT_LOCALE,
    ONE_MONTH_IN_SECONDS,
    LANGUAGE_COOKIES
} from '~/constants';
import {
    extractLocaleFromPath,
    determineLocale
} from 'lib/i18n/utils';
import {
    getCookie,
    setCookie,
} from 'lib/utils/cookies';
import { isStaticOrApiPath } from 'lib/utils/is-static-or-api-path';

export const localBasedUrlMiddleware  = (request: NextRequest) => {
    const { pathname, search } = request.nextUrl;

    if (isStaticOrApiPath(pathname)) {
        return NextResponse.next();
    }

    const localeInPath = extractLocaleFromPath(pathname);
    const localeFromCookie = getCookie(LANGUAGE_COOKIES, request);

    if (localeInPath) {
        if (localeFromCookie !== localeInPath) {
            const response = NextResponse.next();
            setCookie(response, localeInPath, LANGUAGE_COOKIES, ONE_MONTH_IN_SECONDS);

            return response;
        }
        return NextResponse.next();
    }

    const locale = determineLocale(localeFromCookie || DEFAULT_LOCALE);
    const redirectUrl = new URL(`/${locale}${pathname}${search}`, request.url);
    const response = NextResponse.redirect(redirectUrl);
    setCookie(response, locale, LANGUAGE_COOKIES, ONE_MONTH_IN_SECONDS);

    return response;
}
