import {
  DEFAULT_COMPOSITION_NAME,
  DEFAULT_COMPOSITION_SOURCE_URL,
  DEFAULT_COMPOSITION_URL
} from '~/constants/audioPlayer';

import type { AssetRepository } from '~/infrastructure/repositories/assets/asset.repo';
import logger from '~/middleware/logger/logger';

interface AudioPlayerServiceDeps {
  assetRepository: AssetRepository;
}

export type InitialAudioTrack = {
  src: string;
  trackName: string;
};

const DEFAULT_TRACK: InitialAudioTrack = {
  src: DEFAULT_COMPOSITION_URL,
  trackName: DEFAULT_COMPOSITION_NAME
};

const removeFileExtension = (fileName: string) => fileName.replace(/\.[^/.]+$/, '');

const isDefaultComposition = (url: string) => decodeURI(url) === decodeURI(DEFAULT_COMPOSITION_SOURCE_URL);

const getTrackName = ({ url, originalname, filename }: { url: string; originalname?: string; filename: string }) =>
  isDefaultComposition(url) ? DEFAULT_COMPOSITION_NAME : removeFileExtension(originalname || filename);

export const createAudioPlayerService = ({ assetRepository }: AudioPlayerServiceDeps) => {
  const getMainComposition = async () => {
    try {
      return await assetRepository.getMainComposition();
    } catch (error) {
      logger.error('[SERVICE:AudioPlayer:getMainComposition] Failed to fetch main composition', error);
      return null;
    }
  };

  return {
    async getInitialTrack(): Promise<InitialAudioTrack> {
      const mainComposition = await getMainComposition();

      if (!mainComposition) return DEFAULT_TRACK;

      return {
        src: `${DEFAULT_COMPOSITION_URL}?v=${mainComposition._id}`,
        trackName: getTrackName(mainComposition)
      };
    },

    async getMainCompositionSourceUrl(): Promise<string> {
      const mainComposition = await getMainComposition();

      return mainComposition?.url ?? DEFAULT_COMPOSITION_SOURCE_URL;
    }
  };
};
