import { Locale } from 'next-intl';

import { createNewsService } from './newsService';

import { NewsRepository } from '~/infrastructure/repositories/news/news.repo';

describe('newsService', () => {
  const newsRepositoryMock = {
    getAllPublishedNews: jest.fn(),
    getNewsBySlug: jest.fn()
  } as unknown as jest.Mocked<NewsRepository>;

  const newsService = createNewsService({ newsRepository: newsRepositoryMock });
  const locale: Locale = 'uk';

  const mockTipTapContent = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Контент' }]
      }
    ]
  };

  const baseNewsMock = {
    _id: '507f191e810c19729de860ea',
    slug: 'news-1',
    title: { uk: 'Заголовок', en: 'Title' },
    description: { uk: 'Опис', en: 'Desc' },
    newsDate: '2026-03-16T12:00:00Z',
    publishedAt: '2026-03-16T12:00:00Z',
    status: 'published',
    coverImage: {
      src: 'https://img.com/1.jpg',
      alt: { uk: 'Альт', en: 'Alt' },
      caption: { uk: 'Підпис', en: 'Caption' },
      isTmp: false
    },
    meta: {
      title: { uk: 'SEO Title', en: 'SEO Title' },
      description: { uk: 'SEO Desc', en: 'SEO Desc' },
      views: 100
    },
    content: {
      uk: mockTipTapContent,
      en: mockTipTapContent
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPublishedNews', () => {
    it('should fetch and parse published news', async () => {
      newsRepositoryMock.getAllPublishedNews.mockResolvedValue([baseNewsMock] as any);

      const result = await newsService.getAllPublishedNews(locale);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Заголовок');
      expect(newsRepositoryMock.getAllPublishedNews).toHaveBeenCalled();
    });

    it('should return empty array if repository returns null or empty', async () => {
      newsRepositoryMock.getAllPublishedNews.mockResolvedValue([]);

      const result = await newsService.getAllPublishedNews(locale);

      expect(result).toEqual([]);
    });

    it('should return empty array if repository throws (catch block coverage)', async () => {
      newsRepositoryMock.getAllPublishedNews.mockRejectedValue(new Error('Database Error'));

      const result = await newsService.getAllPublishedNews(locale);

      expect(result).toEqual([]);
    });
  });

  describe('getNewsBySlug', () => {
    it('should return localized news if found', async () => {
      newsRepositoryMock.getNewsBySlug.mockResolvedValue(baseNewsMock as any);

      const result = await newsService.getNewsBySlug('news-1', locale);

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Заголовок');
      expect(result?.content).toHaveProperty('type', 'doc');
      expect(newsRepositoryMock.getNewsBySlug).toHaveBeenCalledWith('news-1');
    });

    it('should return null if news is not found', async () => {
      newsRepositoryMock.getNewsBySlug.mockResolvedValue(null);

      const result = await newsService.getNewsBySlug('non-existent', locale);

      expect(result).toBeNull();
    });
  });
});
