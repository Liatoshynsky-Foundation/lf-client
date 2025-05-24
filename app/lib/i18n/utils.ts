import {
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES
} from '~/constants';

export const extractLocaleFromPath = (
    pathname: string
): string | null => {
    const segments = pathname.split('/', 2);
    if (segments.length > 1 && SUPPORTED_LOCALES.includes(segments[1])) {
        return segments[1].toLowerCase();
    }
    return null;
};

export const determineLocale = (localeFromCookie: string): string => {
    if (localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie)) {
        return localeFromCookie;
    }
    return DEFAULT_LOCALE;
};

export const isPublicLocalPath = (
    pathname: string
): boolean => {
    const locale = extractLocaleFromPath(pathname);
    const pathWithoutLocale = locale ? pathname.replace(`/${locale}`, '') || '/' : pathname;

    return /\.(svg|png|jpg|ico)$/.test(pathWithoutLocale);

};