import { newsListItemSchema, newsSchema } from './news.schema';

import { NewsStatus } from '~/domain/dto/news.dto';

describe('newsSchema', () => {
  const baseValidNews = {
    _id: '507f1f77bcf86cd799439011',
    publishedAt: new Date().toISOString(),
    newsDate: new Date().toISOString(),
    title: { uk: 'Заголовок', en: 'Title' },
    description: { uk: 'Опис', en: 'Description' },
    content: {
      uk: { type: 'doc' },
      en: { type: 'doc' }
    },
    slug: 'test-news-slug',
    coverImage: {
      src: '/images/cover.jpg',
      alt: { uk: 'Альт', en: 'Alt' },
      caption: { uk: 'Підпис', en: 'Caption' },
      isTmp: false
    },
    status: NewsStatus.Published,
    meta: {
      views: 10
    }
  };

  it('should successfully parse valid news with localized keywords', () => {
    const dataWithKeywords = {
      ...baseValidNews,
      keywords: {
        uk: 'лятошинський, музика, концерт',
        en: 'liatoshynsky, music, concert'
      }
    };

    const result = newsSchema.safeParse(dataWithKeywords);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.keywords).toEqual({
        uk: 'лятошинський, музика, концерт',
        en: 'liatoshynsky, music, concert'
      });
    }
  });

  it('should successfully parse news when keywords field is omitted', () => {
    const result = newsSchema.safeParse(baseValidNews);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.keywords).toBeUndefined();
    }
  });

  it('should successfully parse news when keywords field is null', () => {
    const dataWithNullKeywords = {
      ...baseValidNews,
      keywords: null
    };

    const result = newsSchema.safeParse(dataWithNullKeywords);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.keywords).toBeNull();
    }
  });

  it('should transform ObjectId object correctly in mongoObjectIdSchema', () => {
    const mockObjectId = {
      toString: () => '507f1f77bcf86cd799439011'
    };

    const resultWithObject = newsSchema.safeParse({
      ...baseValidNews,
      _id: mockObjectId
    });

    expect(resultWithObject.success).toBe(true);
    if (resultWithObject.success) {
      expect(resultWithObject.data._id).toBe('507f1f77bcf86cd799439011');
    }
  });

  it('should handle optional timestamps and null dates', () => {
    const now = new Date();
    const result = newsSchema.safeParse({
      ...baseValidNews,
      publishedAt: null,
      newsDate: null,
      createdAt: now,
      updatedAt: now
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.publishedAt).toBeNull();
      expect(result.data.newsDate).toBeNull();
      expect(result.data.createdAt).toBe(now.toISOString());
      expect(result.data.updatedAt).toBe(now.toISOString());
    }
  });

  it('should successfully parse data using newsListItemSchema', () => {
    const result = newsListItemSchema.safeParse(baseValidNews);
    expect(result.success).toBe(true);
  });
});
