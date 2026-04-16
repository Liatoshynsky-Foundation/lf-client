import { createMediaMentionService } from './mediaMentionService';

import { MediaMentionRepository } from '~/infrastructure/repositories/media-mentions/mediaMention.repo';

describe('mediaMentionService', () => {
  const mediaMentionRepositoryMock = {
    getAllPublishedMediaMentions: jest.fn(),
    getMediaMentionBySlug: jest.fn()
  } as unknown as jest.Mocked<MediaMentionRepository>;

  const mediaMentionService = createMediaMentionService({
    mediaMentionRepository: mediaMentionRepositoryMock
  });

  const validId = '507f191e810c19729de860ea';

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockBaseData = {
    _id: validId,
    title: 'Media Title',
    slug: 'media-slug',
    publishedAt: new Date().toISOString(),
    source: 'Forbes',
    url: 'https://forbes.com/news',
    description: 'Short description for list',
    coverImage: {
      src: 'https://img.com/cover.jpg',
      alt: 'Cover'
    },
    status: 'PUBLISHED',
    meta: {
      title: 'SEO Title',
      description: 'SEO Desc'
    }
  };

  describe('getAllPublishedMediaMentions', () => {
    it('should fetch and parse all published media mentions', async () => {
      mediaMentionRepositoryMock.getAllPublishedMediaMentions.mockResolvedValue([mockBaseData] as any);

      const result = await mediaMentionService.getAllPublishedMediaMentions();

      expect(mediaMentionRepositoryMock.getAllPublishedMediaMentions).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe(validId);
    });
  });

  describe('getMediaMentionBySlug', () => {
    it('should return parsed media mention if found', async () => {
      const fullMockMention = {
        ...mockBaseData,
        content: 'Full content for the detail page'
      };

      mediaMentionRepositoryMock.getMediaMentionBySlug.mockResolvedValue(fullMockMention as any);

      const result = await mediaMentionService.getMediaMentionBySlug('media-slug');

      expect(mediaMentionRepositoryMock.getMediaMentionBySlug).toHaveBeenCalledWith('media-slug');

      expect(result).toMatchObject({
        _id: validId,
        slug: 'media-slug',
        title: 'Media Title',
        status: 'PUBLISHED'
      });

      expect(result?.meta).toHaveProperty('views');
    });

    it('should return null if media mention is not found (branch coverage)', async () => {
      mediaMentionRepositoryMock.getMediaMentionBySlug.mockResolvedValue(null);

      const result = await mediaMentionService.getMediaMentionBySlug('non-existent');

      expect(result).toBeNull();
      expect(mediaMentionRepositoryMock.getMediaMentionBySlug).toHaveBeenCalledWith('non-existent');
    });
  });
});
