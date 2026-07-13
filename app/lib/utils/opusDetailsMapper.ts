import type { OpusDetailsDTO } from '~/domain/dto/composition.dto';
import type {
  OpusComposition,
  OpusDetailsProps,
  OpusVideo
} from '~/shared/components/blocks/opus-details/opusDetails.types';

export type OpusDetailsContent = Omit<OpusDetailsProps, 'backHref' | 'labels'>;

export function mapOpusDetailsToProps(opusDetails: OpusDetailsDTO): OpusDetailsContent {
  const compositions: OpusComposition[] = opusDetails.compositions.map((composition) => ({
    id: composition._id,
    index: composition.index,
    title: composition.title,
    sheetMusicUrl: composition.sheetMusicUrl
  }));

  const videos: OpusVideo[] = opusDetails.videos.map((video) => ({
    id: video._id,
    youTubeId: video.youTubeId,
    title: video.title
  }));

  return {
    title: opusDetails.title,
    number: opusDetails.number,
    creationDate: opusDetails.creationDate,
    genre: opusDetails.genre,
    movements: opusDetails.movements,
    sheetMusicUrl: opusDetails.sheetMusicUrl,
    description: opusDetails.description,
    compositions,
    videos
  };
}
