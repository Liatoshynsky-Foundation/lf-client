import type { TipTapDoc } from '~/types/types/tiptap.types';

import type { OpusDetailsDTO } from '~/domain/dto/composition.dto';
import { parseTipTapString } from '~/lib/utils/tiptapHelpers';
import type {
  OpusComposition,
  OpusDetailsProps,
  OpusVideo
} from '~/shared/components/blocks/opus-details/opusDetails.types';

export type OpusDetailsContent = Omit<OpusDetailsProps, 'backHref' | 'labels'>;

export function mapOpusDetailsToProps(opusDetails: OpusDetailsDTO): OpusDetailsContent {
  const compositions: OpusComposition[] = (opusDetails.compositions || []).map((composition, index) => ({
    id: composition._id,
    index: index + 1,
    name: composition.name,
    sheetMusic: composition.sheetMusic || undefined
  }));

  const videos: OpusVideo[] = (opusDetails.videos || []).map((video) => ({
    id: video._id,
    youTubeId: video.youTubeId,
    title: video.title || ''
  }));

  return {
    name: opusDetails.name,
    number: opusDetails.number,
    year: opusDetails.year,
    genre: opusDetails.genre || undefined,
    introDescription: opusDetails.introDescription
      ? (parseTipTapString(opusDetails.introDescription) as TipTapDoc)
      : null,
    movements: opusDetails.movements || undefined,
    sheetMusic: opusDetails.sheetMusic || null,
    compositions,
    videos,
    gallery: opusDetails.gallery
  };
}
