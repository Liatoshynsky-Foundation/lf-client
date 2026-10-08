import { createSeoMeta } from './createSeoMeta';

import { ROUTES } from '~/shared/components/constants/routes';

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
      url: ROUTES.ARTISTRY,
      imageUrl: '/images/test.jpg',
      locale: 'uk'
    });

    expect(meta.title).toBe('Test Title');
    expect(meta.description).toBe('Test Description');
    expect(meta.openGraph?.url).toBe(`${localBaseUrl}/uk${ROUTES.ARTISTRY}`);
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
      url: ROUTES.HOME,
      locale: 'en'
    });

    expect(meta.openGraph?.url).toBe(`${prodBaseUrl}/en/`);
    expect(meta.openGraph?.locale).toBe('en_US');
    expect(meta.openGraph?.alternateLocale).toBe('uk_UA');

    if (Array.isArray(meta.openGraph?.images)) {
      expect(meta.openGraph.images[0]).toEqual({
        alt: 'Prod Title',
        height: 630,
        url: `${prodBaseUrl}/opengraph-image.png`,
        width: 1200
      });
    }
  });

  it('should include keywords in metadata when provided', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development', CLIENT_BASE_URL: localBaseUrl };

    const meta = createSeoMeta({
      title: 'Keywords Title',
      description: 'Keywords Description',
      url: '/news/test',
      keywords: 'music, composer, art'
    });

    expect(meta.keywords).toBe('music, composer, art');
  });

  it('should not include keywords in metadata when omitted', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development', CLIENT_BASE_URL: localBaseUrl };

    const meta = createSeoMeta({
      title: 'No Keywords Title',
      description: 'No Keywords Description',
      url: '/news/test'
    });

    expect(meta.keywords).toBeUndefined();
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
        url: `${localBaseUrl}/opengraph-image.png`,
        width: 1200
      });
    }
  });

  it.each([
    {
      allowIndexation: false,
      expectedRobots: { index: false, follow: false }
    },
    {
      allowIndexation: true,
      expectedRobots: { index: true, follow: true }
    }
  ])(
    'should configure robots as $expectedRobots when allowIndexation is $allowIndexation',
    ({ allowIndexation, expectedRobots }) => {
      process.env.CLIENT_BASE_URL = localBaseUrl;

      const metadata = createSeoMeta({
        title: 'Test Title',
        description: 'Test Description',
        url: '/artistry/test',
        allowIndexation
      });

      expect(metadata.robots).toEqual(expectedRobots);
    }
  );

  it.each([
    {
      caseDescription: 'custom imageAlt is provided',
      imageAlt: 'Custom Alt Text',
      expectedAlt: 'Custom Alt Text'
    },
    {
      caseDescription: 'imageAlt is omitted (fallback to title)',
      imageAlt: undefined,
      expectedAlt: 'Title Fallback'
    }
  ])('should set og:image:alt correctly when $caseDescription', ({ imageAlt, expectedAlt }) => {
    process.env.CLIENT_BASE_URL = localBaseUrl;

    const metadata = createSeoMeta({
      title: 'Title Fallback',
      description: 'Description',
      url: '/artistry/test',
      imageAlt
    });

    const ogImages = metadata.openGraph?.images as Array<{ alt?: string }>;
    expect(ogImages?.[0]?.alt).toBe(expectedAlt);
  });

  it('should handle absolute imageUrl without prepending baseUrl', () => {
    process.env.CLIENT_BASE_URL = localBaseUrl;
    const absoluteImg = 'https://cdn.example.com/cover.jpg';

    const metadata = createSeoMeta({
      title: 'Test Title',
      description: 'Test Description',
      url: '/artistry/test',
      imageUrl: absoluteImg
    });

    const ogImages = metadata.openGraph?.images as Array<{ url?: string }>;
    expect(ogImages?.[0]?.url).toBe(absoluteImg);
    expect(metadata.twitter?.images).toEqual([absoluteImg]);
  });
});
