import newMediaMentionRepository from './mediaMention.repository';

import { MediaMentionStatus } from '~/domain/dto/mediaMention.dto';
import MediaMentionModel from '~/infrastructure/models/media-mentions/mediaMention.model';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));

jest.mock('~/infrastructure/models/media-mentions/mediaMention.model', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findOne: jest.fn()
  }
}));

const mediaMentionRepository = newMediaMentionRepository();

const createFakeId = () => '65f1d5f2' + Date.now().toString(16).slice(-8);

const mockMongooseChain = (resolvedValue: any) => ({
  select: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  lean: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(resolvedValue)
});

const validMentionData = {
  _id: createFakeId(),
  url: 'https://example.com/article',
  title: 'Test Media Mention',
  description: 'A short description for the test',
  slug: 'test-media-mention',
  coverImage: {
    src: 'https://example.com/image.jpg',
    alt: 'Cover alt text'
  },
  publishedAt: '2024-01-01T12:00:00.000Z',
  status: MediaMentionStatus.Published,
  meta: {
    title: 'Meta Title',
    description: 'Meta Description'
  }
};

describe('mediaMentionRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPublishedMediaMentions', () => {
    it('should return published media mentions and parse them via Zod', async () => {
      (MediaMentionModel.find as jest.Mock).mockReturnValue(mockMongooseChain([validMentionData]));

      const result = await mediaMentionRepository.getAllPublishedMediaMentions();

      expect(MediaMentionModel.find).toHaveBeenCalledWith({ status: MediaMentionStatus.Published });
      expect(result).toHaveLength(1);

      expect(typeof result[0]._id).toBe('string');
      expect(result[0].slug).toBe('test-media-mention');
      expect(result[0].publishedAt).toBe('2024-01-01T12:00:00.000Z');
    });
  });

  describe('getMediaMentionBySlug', () => {
    it('should return null if mention not found', async () => {
      (MediaMentionModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await mediaMentionRepository.getMediaMentionBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('should return media mention details and parse via Zod', async () => {
      (MediaMentionModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(validMentionData));

      const result = await mediaMentionRepository.getMediaMentionBySlug('test-media-mention');

      expect(MediaMentionModel.findOne).toHaveBeenCalledWith({
        slug: 'test-media-mention',
        status: MediaMentionStatus.Published
      });

      if (!result) throw new Error('Result is null');

      expect(result._id).toBe(validMentionData._id);
      expect(result.url).toBe(validMentionData.url);
      expect(result.slug).toBe('test-media-mention');
    });
  });
});
