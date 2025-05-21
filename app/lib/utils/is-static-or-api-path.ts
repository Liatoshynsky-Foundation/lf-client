export const isStaticOrApiPath = (
    pathname: string
): boolean => {
    const ignoredPrefixes = [
        '/api',
        '/.next/static',
        '/.next/image',
        '/favicon.ico'
    ];
    return ignoredPrefixes.some(prefix => pathname.startsWith(prefix));
};