export const isStaticOrApiPath = (
    pathname: string
): boolean => {
    const ignoredPrefixes = [
        '/api',
        '/_next/static'
    ];
    return ignoredPrefixes.some(prefix => pathname.startsWith(prefix));
};