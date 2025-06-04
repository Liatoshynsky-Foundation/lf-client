import createEmotionCache from '~/lib/utils/createEmotionCache';

describe('createEmotionCache', () => {
  it('should return a cache instance with the correct key and options', () => {
    const cache = createEmotionCache();

    expect(cache).toBeDefined();
    expect(typeof cache.insert).toBe('function');
    expect(cache.key).toBe('css');
  });
});
