import newNewsRepository from './news.repository';

import { NewsStatus } from '~/domain/dto/news.dto';
import NewsModel from '~/infrastructure/models/news/news.model';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));

jest.mock('~/infrastructure/models/news/news.model', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findOne: jest.fn()
  }
}));

const newsRepository = newNewsRepository();

let counterA = 0x10000000;
const createFakeId = () => '65f1d5f2' + (counterA++).toString(16) + 'a1b2c3d4';

const mockMongooseChain = (resolvedValue: any) => ({
  select: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

const validNewsData = {
  _id: createFakeId(),
  publishedAt: '2026-03-16T12:00:00.000Z',
  newsDate: '2026-03-16T12:00:00.000Z',
  title: { uk: 'Заголовок', en: 'Title' },
  description: { uk: 'Опис', en: 'Description' },
  content: { uk: {}, en: {} },
  slug: 'test-news-slug',
  coverImage: {
    src: 'https://example.com/news-cover.jpg',
    alt: { uk: 'Альт', en: 'Alt' },
    caption: { uk: 'Підпис', en: 'Caption' },
    isTmp: false
  },
  meta: {
    title: 'Meta Title',
    description: 'Meta Description',
    views: 4
  },
  status: NewsStatus.Published
};

describe('newsRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('newNewsRepository', () => {
    it('should return the repository instance', () => {
      const repo = newNewsRepository();
      expect(repo).toBeDefined();
      expect(typeof repo.getAllPublishedNews).toBe('function');
      expect(typeof repo.getNewsBySlug).toBe('function');
    });
  });

  describe('getAllPublishedNews', () => {
    it('should return published news and parse them via Zod', async () => {
      (NewsModel.find as jest.Mock).mockReturnValue(mockMongooseChain([validNewsData]));

      const result = await newsRepository.getAllPublishedNews();

      expect(NewsModel.find).toHaveBeenCalledWith({ status: NewsStatus.Published });
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('test-news-slug');
    });

    it('should return empty array if news is falsy (covers lines 14-16)', async () => {
      (NewsModel.find as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await newsRepository.getAllPublishedNews();

      expect(result).toEqual([]);
    });

    it('should return data without validation if news contains invalid fields', async () => {
      const invalidData = [{ ...validNewsData, title: 123 }];

      (NewsModel.find as jest.Mock).mockReturnValue(mockMongooseChain(invalidData));

      const result = await newsRepository.getAllPublishedNews();

      expect(result).toEqual(invalidData);
    });
  });

  describe('getNewsBySlug', () => {
    it('should return null if news not found', async () => {
      (NewsModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await newsRepository.getNewsBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('should return news details and parse via Zod', async () => {
      (NewsModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(validNewsData));

      const result = await newsRepository.getNewsBySlug('test-news-slug');

      expect(NewsModel.findOne).toHaveBeenCalledWith({ slug: 'test-news-slug' });

      if (!result) throw new Error('Result is null');

      expect(result._id).toBe(validNewsData._id);
      expect(result.slug).toBe(validNewsData.slug);
    });

    it('should return single news without validation if it contains invalid fields', async () => {
      const invalidData = { ...validNewsData, title: 123 };

      (NewsModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(invalidData));

      const result = await newsRepository.getNewsBySlug('test-news-slug');

      expect(result).toEqual(invalidData);
    });
  });
});
