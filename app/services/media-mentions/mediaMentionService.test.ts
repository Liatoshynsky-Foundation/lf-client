import { createMediaMentionService } from './mediaMentionService';

import { MediaMentionStatus } from '~/domain/dto/mediaMention.dto';
import type { MediaMentionRepository } from '~/infrastructure/repositories/media-mentions/mediaMention.repo';
import logger from '~/middleware/logger/logger';

jest.mock('~/middleware/logger/logger', () => ({
  error: jest.fn(),
  warn: jest.fn()
}));

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

  type RepoListItem = Awaited<ReturnType<MediaMentionRepository['getAllPublishedMediaMentions']>>[0];
  type RepoDetailItem = NonNullable<Awaited<ReturnType<MediaMentionRepository['getMediaMentionBySlug']>>>;

  const mockBaseData: Partial<RepoListItem> = {
    _id: validId,
    title: 'Media Title',
    slug: 'media-slug',
    publishedAt: new Date().toISOString(),
    url: 'https://forbes.com/news',
    description: 'Short description for list',
    coverImage: {
      src: 'https://img.com/cover.jpg',
      alt: 'Cover'
    },
    meta: {
      views: 0
    }
  };

  describe('getAllPublishedMediaMentions', () => {
    it('should fetch and parse all published media mentions', async () => {
      mediaMentionRepositoryMock.getAllPublishedMediaMentions.mockResolvedValue([
        mockBaseData as unknown as RepoListItem
      ]);

      const result = await mediaMentionService.getAllPublishedMediaMentions();

      expect(mediaMentionRepositoryMock.getAllPublishedMediaMentions).toHaveBeenCalledTimes(1);
      expect(mediaMentionRepositoryMock.getAllPublishedMediaMentions).toHaveBeenCalledWith('uk');
      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe(validId);
    });

    it('should log warning if some media mentions fail validation', async () => {
      const invalidData = {
        ...mockBaseData,
        slug: undefined
      };

      mediaMentionRepositoryMock.getAllPublishedMediaMentions.mockResolvedValue([
        invalidData as unknown as RepoListItem
      ]);

      const result = await mediaMentionService.getAllPublishedMediaMentions();

      expect(result).toHaveLength(0);
      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Skipped 1 invalid media mentions records'));
    });

    it('should return an empty array if repository returns an empty array', async () => {
      mediaMentionRepositoryMock.getAllPublishedMediaMentions.mockResolvedValue([]);

      const result = await mediaMentionService.getAllPublishedMediaMentions();

      expect(result).toEqual([]);
    });

    it('should return an empty array and log error if repository or parsing fails', async () => {
      const dbError = new Error('DB Connection error');
      mediaMentionRepositoryMock.getAllPublishedMediaMentions.mockRejectedValue(dbError);

      const result = await mediaMentionService.getAllPublishedMediaMentions();

      expect(result).toEqual([]);
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('[SERVICE:MediaMentions:getAllPublishedMediaMentions]'),
        dbError
      );
    });
  });

  describe('getMediaMentionBySlug', () => {
    it('should return parsed media mention if found', async () => {
      const fullMockMention: Partial<RepoDetailItem> = {
        ...mockBaseData,
        status: MediaMentionStatus.Published
      };

      mediaMentionRepositoryMock.getMediaMentionBySlug.mockResolvedValue(fullMockMention as unknown as RepoDetailItem);

      const result = await mediaMentionService.getMediaMentionBySlug('media-slug');

      expect(mediaMentionRepositoryMock.getMediaMentionBySlug).toHaveBeenCalledWith('media-slug', 'uk');

      expect(result).toMatchObject({
        _id: validId,
        slug: 'media-slug',
        title: 'Media Title',
        status: MediaMentionStatus.Published
      });

      expect(result?.meta).toHaveProperty('views');
    });

    it('should return null if media mention is not found (branch coverage)', async () => {
      mediaMentionRepositoryMock.getMediaMentionBySlug.mockResolvedValue(null);

      const result = await mediaMentionService.getMediaMentionBySlug('non-existent');

      expect(result).toBeNull();
      expect(mediaMentionRepositoryMock.getMediaMentionBySlug).toHaveBeenCalledWith('non-existent', 'uk');
    });

    it('should return null and log error if parsing or repository fails', async () => {
      const invalidMockMention = {
        ...mockBaseData,
        status: 'INVALID_STATUS_FOR_ZOD_SHIELD'
      } as unknown as RepoDetailItem;
      mediaMentionRepositoryMock.getMediaMentionBySlug.mockResolvedValue(invalidMockMention);

      const result = await mediaMentionService.getMediaMentionBySlug('media-slug');

      expect(result).toBeNull();
      expect(logger.error).toHaveBeenCalledTimes(1);
    });
  });
});
