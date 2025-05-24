const cache = new Map<string, unknown>();

export const cacheAsync = async <T>(
    key: string,
    fn: () => Promise<T>
): Promise<T> => {
    if (cache.has(key)) {
        return cache.get(key) as T;
    }

    const result = await fn();
    cache.set(key, result);
    return result;
};

export const clearCache = (): void => {
    cache.clear();
};