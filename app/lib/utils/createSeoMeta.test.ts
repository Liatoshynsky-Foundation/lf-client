import { createSeoMeta } from './createSeoMeta';

describe('createSeoMeta', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should generate metadata in development mode (localhost)', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development' };

    const meta = createSeoMeta({
      title: 'Test Title',
      description: 'Test Description',
      url: '/artistry',
      keywords: ['test', 'artistry'],
      imageUrl: '/images/test.jpg',
      locale: 'uk'
    });

    expect(meta.title).toBe('Test Title');
    expect(meta.description).toBe('Test Description');
    expect(meta.keywords).toEqual(['test', 'artistry']);
    expect(meta.openGraph?.url).toBe('http://localhost:3000/uk/artistry');
    expect(meta.openGraph?.locale).toBe('uk_UA');
    expect(meta.openGraph?.alternateLocale).toBe('en_US');

    if (Array.isArray(meta.openGraph?.images) && Array.isArray(meta.twitter?.images)) {
      expect(meta.openGraph.images[0]).toEqual({
        alt: 'Test Title',
        height: 630,
        url: 'http://localhost:3000/images/test.jpg',
        width: 1200
      });

      expect(meta.twitter.images[0]).toBe('http://localhost:3000/images/test.jpg');
    }
  });

  it('should generate metadata for production', () => {
    const baseUrl = 'https://lf-client.com';
    process.env = { ...originalEnv, NODE_ENV: 'production', BASE_URL: baseUrl };

    const meta = createSeoMeta({
      title: 'Prod Title',
      description: 'Prod Description',
      url: '/',
      locale: 'en'
    });

    expect(meta.openGraph?.url).toBe(`${baseUrl}/en/`);
    expect(meta.openGraph?.locale).toBe('en_US');
    expect(meta.openGraph?.alternateLocale).toBe('uk_UA');

    if (Array.isArray(meta.openGraph?.images)) {
      expect(meta.openGraph.images[0]).toEqual({
        alt: 'Prod Title',
        height: 630,
        url: `${baseUrl}/images/liatoshynsky-thumbnail.jpg`,
        width: 1200
      });
    }
  });

  it('should fallback to defaults when optional fields are missing', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development' };

    const meta = createSeoMeta({
      title: 'Fallback Title',
      description: 'Fallback Desc',
      url: '/home'
    });

    expect(meta.keywords).toEqual([]);

    if (Array.isArray(meta.openGraph?.images)) {
      expect(meta.openGraph.images[0]).toEqual({
        alt: 'Fallback Title',
        height: 630,
        url: 'http://localhost:3000/images/liatoshynsky-thumbnail.jpg',
        width: 1200
      });
    }
  });
});
