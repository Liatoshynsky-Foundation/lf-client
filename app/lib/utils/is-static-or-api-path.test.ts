import { isStaticOrApiPath } from '~/lib/utils/is-static-or-api-path';

describe('isStaticOrApiPath', () => {
    it('should return false if it is not an /api or /_next/static path', () => {
        const pathname = [
            '/uk/test-page',
            '/test-page',
            '/e/test-page'
        ];
        for (const path of pathname) {
            expect(isStaticOrApiPath(path)).toBe(false);
        }
    });

    it('should return true if it is an /api or /_next/static path', () => {
        const pathname = [
            '/api/test-endpoint',
            '/_next/static/development/',
        ];
        for (const path of pathname) {
            expect(isStaticOrApiPath(path)).toBe(true);
        }
    });
});
