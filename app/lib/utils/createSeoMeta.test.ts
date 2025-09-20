import { createSeoMeta } from './createSeoMeta';

const localBaseUrl = 'http://localhost:3000';
const prodBaseUrl = 'https://lf-client.com';

describe('createSeoMeta', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should generate metadata in development mode (localhost)', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development', CLIENT_BASE_URL: localBaseUrl };

    const meta = createSeoMeta({
      title: 'Test Title',
      description: 'Test Description',
      url: '/artistry',
      imageUrl: '/images/test.jpg',
      locale: 'uk'
    });

    expect(meta.title).toBe('Test Title');
    expect(meta.description).toBe('Test Description');
    expect(meta.openGraph?.url).toBe(`${localBaseUrl}/uk/artistry`);
    expect(meta.openGraph?.locale).toBe('uk_UA');
    expect(meta.openGraph?.alternateLocale).toBe('en_US');

    if (Array.isArray(meta.openGraph?.images) && Array.isArray(meta.twitter?.images)) {
      expect(meta.openGraph.images[0]).toEqual({
        alt: 'Test Title',
        height: 630,
        url: `${localBaseUrl}/images/test.jpg`,
        width: 1200
      });

      expect(meta.twitter.images[0]).toBe(`${localBaseUrl}/images/test.jpg`);
    }
  });

  it('should generate metadata for production', () => {
    process.env = { ...originalEnv, NODE_ENV: 'production', CLIENT_BASE_URL: prodBaseUrl };

    const meta = createSeoMeta({
      title: 'Prod Title',
      description: 'Prod Description',
      url: '/',
      locale: 'en'
    });

    expect(meta.openGraph?.url).toBe(`${prodBaseUrl}/en/`);
    expect(meta.openGraph?.locale).toBe('en_US');
    expect(meta.openGraph?.alternateLocale).toBe('uk_UA');

    if (Array.isArray(meta.openGraph?.images)) {
      expect(meta.openGraph.images[0]).toEqual({
        alt: 'Prod Title',
        height: 630,
        url: `${prodBaseUrl}/images/liatoshynsky-thumbnail.jpg`,
        width: 1200
      });
    }
  });

  it('should fallback to defaults when optional fields are missing', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development', CLIENT_BASE_URL: localBaseUrl };

    const meta = createSeoMeta({
      title: 'Fallback Title',
      description: 'Fallback Desc',
      url: '/home'
    });

    if (Array.isArray(meta.openGraph?.images)) {
      expect(meta.openGraph.images[0]).toEqual({
        alt: 'Fallback Title',
        height: 630,
        url: `${localBaseUrl}/images/liatoshynsky-thumbnail.jpg`,
        width: 1200
      });
    }
  });
});
