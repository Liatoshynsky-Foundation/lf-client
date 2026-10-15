import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageMetadata } from './getPageMetadata';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(),
  setRequestLocale: jest.fn()
}));

jest.mock('~/lib/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((props) => props)
}));

describe('getPageMetadata', () => {
  const mockTranslate = jest.fn();
  const mockParamsUk = Promise.resolve({ lang: 'uk' as const });
  const mockParamsEn = Promise.resolve({ lang: 'en' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    mockTranslate.mockImplementation((key: string) => `fallback_${key}`);
    (getTranslations as jest.Mock).mockResolvedValue(mockTranslate);
  });

  it('should use pre-localized CMS string values when returned by fetchPageMetaData', async () => {
    const mockPageData = {
      title: 'ДоСлІдЖЕннЯ ТА НауКовІ РоБотИ',
      description: 'Науковий опис досліджень',
      canonicalUrl: 'https://liatoshynsky.com/uk/research',
      keywords: 'лятошинський, дослідження, архів',
      allowIndexation: true
    };

    const result = await getPageMetadata(mockParamsUk, {
      pageTranslationKey: 'meta.pages.research',
      pageRoute: '/uk/research',
      fetchPageMetaData: jest.fn().mockResolvedValue(mockPageData)
    });

    expect(setRequestLocale).toHaveBeenCalledWith('uk');
    expect(createSeoMeta).toHaveBeenCalledWith({
      title: 'ДоСлІдЖЕннЯ ТА НауКовІ РоБотИ',
      description: 'Науковий опис досліджень',
      url: 'https://liatoshynsky.com/uk/research',
      locale: 'uk',
      keywords: ['лятошинський', 'дослідження', 'архів']
    });
    expect(result.robots).toBe('index, follow');
  });

  it('should extract correct language when CMS data provides a localized object { uk, en }', async () => {
    const mockLocalizedData = {
      title: { uk: 'Заголовок UA', en: 'Title EN' },
      description: { uk: 'Опис UA', en: 'Description EN' },
      keywords: { uk: 'слово1, слово2', en: 'word1, word2' },
      canonicalUrl: { uk: '/canonical-ua', en: '/canonical-en' },
      allowIndexation: { uk: true, en: false }
    };

    const result = await getPageMetadata(mockParamsEn, {
      pageTranslationKey: 'meta.pages.test',
      pageRoute: '/default-route',
      fetchPageMetaData: jest.fn().mockResolvedValue(mockLocalizedData)
    });

    expect(setRequestLocale).toHaveBeenCalledWith('en');
    expect(createSeoMeta).toHaveBeenCalledWith({
      title: 'Title EN',
      description: 'Description EN',
      url: '/canonical-en',
      locale: 'en',
      keywords: ['word1', 'word2']
    });
    expect(result.robots).toBe('noindex, nofollow');
  });

  it('should fallback to static translations and default pageRoute when CMS data is empty or null', async () => {
    const result = await getPageMetadata(mockParamsUk, {
      pageTranslationKey: 'meta.pages.research',
      pageRoute: '/uk/research',
      fetchPageMetaData: jest.fn().mockResolvedValue(null)
    });

    expect(createSeoMeta).toHaveBeenCalledWith({
      title: 'fallback_title',
      description: 'fallback_description',
      url: '/uk/research',
      locale: 'uk'
    });
    expect(result.robots).toBe('index, follow');
  });

  it('should gracefully fallback to translations when fetchPageMetaData rejects/throws an error', async () => {
    const failingFetch = jest.fn().mockRejectedValue(new Error('Network or database timeout'));

    const result = await getPageMetadata(mockParamsUk, {
      pageTranslationKey: 'meta.pages.research',
      pageRoute: '/uk/research',
      fetchPageMetaData: failingFetch
    });

    expect(createSeoMeta).toHaveBeenCalledWith({
      title: 'fallback_title',
      description: 'fallback_description',
      url: '/uk/research',
      locale: 'uk'
    });
    expect(result.robots).toBe('index, follow');
  });

  it('should work correctly when fetchPageMetaData is not provided in config', async () => {
    const result = await getPageMetadata(mockParamsUk, {
      pageTranslationKey: 'meta.pages.simple',
      pageRoute: '/uk/simple'
    });

    expect(createSeoMeta).toHaveBeenCalledWith({
      title: 'fallback_title',
      description: 'fallback_description',
      url: '/uk/simple',
      locale: 'uk'
    });
    expect(result.robots).toBe('index, follow');
  });

  it('should set robots to "noindex, nofollow" when allowIndexation is explicitly false', async () => {
    const mockPageData = {
      allowIndexation: false
    };

    const result = await getPageMetadata(mockParamsUk, {
      pageTranslationKey: 'meta.pages.test',
      pageRoute: '/test',
      fetchPageMetaData: jest.fn().mockResolvedValue(mockPageData)
    });

    expect(result.robots).toBe('noindex, nofollow');
  });
});
