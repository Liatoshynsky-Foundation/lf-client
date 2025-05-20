import {
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES
} from "~/constants";

export const extractLocaleFromPath = (
    pathname: string
): string | null => {
    const segments = pathname.split('/');
    if (segments.length > 1 && SUPPORTED_LOCALES.includes(segments[1])) {
        return segments[1];
    }
    return null;
}

export const determineLocale = (localeFromCookie?: string): string => {
    if (localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie)) {
        return localeFromCookie;
    }
    return DEFAULT_LOCALE;
}