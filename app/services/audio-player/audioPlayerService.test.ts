import { createAudioPlayerService } from './audioPlayerService';
import {
  DEFAULT_COMPOSITION_NAME,
  DEFAULT_COMPOSITION_SOURCE_URL,
  DEFAULT_COMPOSITION_URL
} from '~/constants/audioPlayer';

import type { AssetRepository } from '~/infrastructure/repositories/assets/asset.repo';
import logger from '~/middleware/logger/logger';

jest.mock('~/middleware/logger/logger', () => ({
  error: jest.fn()
}));

describe('audioPlayerService', () => {
  const assetRepositoryMock = {
    getMainComposition: jest.fn()
  } as unknown as jest.Mocked<AssetRepository>;

  const audioPlayerService = createAudioPlayerService({ assetRepository: assetRepositoryMock });

  const mainComposition = {
    _id: 'asset-id',
    filename: 'generated-name.mp3',
    originalname: 'Поема про ліс.mp3',
    url: 'https://example.com/main.mp3'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInitialTrack', () => {
    it('should return the main composition track when it is set', async () => {
      assetRepositoryMock.getMainComposition.mockResolvedValue(mainComposition);

      const result = await audioPlayerService.getInitialTrack();

      expect(result).toEqual({
        src: `${DEFAULT_COMPOSITION_URL}?v=asset-id`,
        trackName: 'Поема про ліс'
      });
    });

    it('should keep the default track name when the default composition is set as main', async () => {
      assetRepositoryMock.getMainComposition.mockResolvedValue({
        _id: 'default-asset-id',
        filename: 'Симфонія №4_2частина.mp3',
        originalname: 'Симфонія №4_2частина.mp3',
        url: decodeURI(DEFAULT_COMPOSITION_SOURCE_URL)
      });

      const result = await audioPlayerService.getInitialTrack();

      expect(result).toEqual({
        src: `${DEFAULT_COMPOSITION_URL}?v=default-asset-id`,
        trackName: DEFAULT_COMPOSITION_NAME
      });
    });

    it('should use the file name when the original name is missing', async () => {
      assetRepositoryMock.getMainComposition.mockResolvedValue({ ...mainComposition, originalname: undefined });

      const result = await audioPlayerService.getInitialTrack();

      expect(result.trackName).toBe('generated-name');
    });

    it('should return the default track when there is no main composition', async () => {
      assetRepositoryMock.getMainComposition.mockResolvedValue(null);

      const result = await audioPlayerService.getInitialTrack();

      expect(result).toEqual({ src: DEFAULT_COMPOSITION_URL, trackName: DEFAULT_COMPOSITION_NAME });
    });

    it('should return the default track and log the error when the repository fails', async () => {
      assetRepositoryMock.getMainComposition.mockRejectedValue(new Error('DB error'));

      const result = await audioPlayerService.getInitialTrack();

      expect(result).toEqual({ src: DEFAULT_COMPOSITION_URL, trackName: DEFAULT_COMPOSITION_NAME });
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('getMainCompositionSourceUrl', () => {
    it('should return the main composition url when it is set', async () => {
      assetRepositoryMock.getMainComposition.mockResolvedValue(mainComposition);

      await expect(audioPlayerService.getMainCompositionSourceUrl()).resolves.toBe('https://example.com/main.mp3');
    });

    it('should return the default source url when there is no main composition', async () => {
      assetRepositoryMock.getMainComposition.mockResolvedValue(null);

      await expect(audioPlayerService.getMainCompositionSourceUrl()).resolves.toBe(DEFAULT_COMPOSITION_SOURCE_URL);
    });
  });
});
