import {
    cacheAsync,
    clearCache
} from '~/lib/utils/cache';

describe('cacheAsync', () => {

    beforeEach(() => {
        clearCache();
    });

    test('should cache and return result', async () => {
        const fn = jest.fn(async () => 'cache');

        const result1 = await cacheAsync('key1', fn);
        const result2 = await cacheAsync('key1', fn);

        expect(result1).toBe('cache');
        expect(result1).toStrictEqual(result2);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('should work with different keys', async () => {
        const fn = jest.fn(async () => 'cache');
        for (let i = 0; i < 10; i++) {
            await cacheAsync(`${i}`, fn);
        }
        expect(fn).toHaveBeenCalledTimes(10);
    });

    test('should call fn again after clearing cache', async () => {
        const fn = jest.fn(async () => 'cache');

        await cacheAsync('A', fn);
        clearCache();
        await cacheAsync('A', fn);

        expect(fn).toHaveBeenCalledTimes(2);
    });
});
