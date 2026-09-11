const IMAGE_EXTENSION_REGEX = /\.(jpeg|jpg|gif|png|webp|svg|avif)(\?.*)?$/i;

export const isValidUrl = (url: string | null | undefined): url is string => {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('/')) return true;

  try {
    new URL(url);
    return true;
  } catch (error) {
    if (IMAGE_EXTENSION_REGEX.test(url)) {
      return true;
    }

    const logger = globalThis['console'];
    if (logger) {
      logger.warn(`[isValidUrl] Failed to parse image URL: ${url}`, error);
    }
    return false;
  }
};
