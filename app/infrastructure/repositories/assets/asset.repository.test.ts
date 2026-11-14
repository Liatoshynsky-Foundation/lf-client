import newAssetRepository from './asset.repository';

import AssetModel from '~/infrastructure/models/assets/asset.model';

jest.mock('~/infrastructure/db/connect', () => ({ __esModule: true, default: jest.fn() }));

jest.mock('~/infrastructure/models/assets/asset.model', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn()
  }
}));

const assetRepository = newAssetRepository();

const mockMongooseChain = <T>(resolvedValue: T) => ({
  select: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

describe('assetRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMainComposition', () => {
    it('should return the audio asset marked as the main composition', async () => {
      (AssetModel.findOne as jest.Mock).mockReturnValue(
        mockMongooseChain({
          _id: { toString: () => 'asset-id' },
          filename: 'main.mp3',
          originalname: 'Головна композиція.mp3',
          url: 'https://example.com/main.mp3'
        })
      );

      const result = await assetRepository.getMainComposition();

      expect(AssetModel.findOne).toHaveBeenCalledWith({ type: 'audio', isMainComposition: true });
      expect(result).toEqual({
        _id: 'asset-id',
        filename: 'main.mp3',
        originalname: 'Головна композиція.mp3',
        url: 'https://example.com/main.mp3'
      });
    });

    it('should return null when there is no main composition', async () => {
      (AssetModel.findOne as jest.Mock).mockReturnValue(mockMongooseChain(null));

      const result = await assetRepository.getMainComposition();

      expect(result).toBeNull();
    });
  });
});
