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

export const urlLocaleMiddleware  = (request: NextRequest) => {
    const { pathname, search } = request.nextUrl;

    const localeInPath = extractLocaleFromPath(pathname);
    const rawLocaleFromCookie = getCookie(LANGUAGE_COOKIES, request);
    const localeFromCookie = rawLocaleFromCookie.toLowerCase();

    if (localeInPath && localeFromCookie !== localeInPath) {
        const response = NextResponse.next();
        setCookie(response, localeInPath.toLowerCase(), LANGUAGE_COOKIES, ONE_MONTH_IN_SECONDS);
        return response;
    }

    if (localeInPath) {
        return NextResponse.next();
    }

    const locale = determineLocale(localeFromCookie || DEFAULT_LOCALE);
    const redirectUrl = new URL(`/${locale}${pathname}${search}`, request.url);
    const response = NextResponse.redirect(redirectUrl);
    setCookie(response, locale.toLowerCase(), LANGUAGE_COOKIES, ONE_MONTH_IN_SECONDS);

    return response;
}
