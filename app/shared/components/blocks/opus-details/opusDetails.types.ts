import { TipTapDoc } from '~/types/types/tiptap.types';

import { MusicItem, OpusGalleryItem } from '~/domain/entities/artistry.entity';

export type OpusComposition = {
  id: string;
  index: number;
  name: string;
  sheetMusic?: MusicItem[];
};

export type OpusVideo = {
  id: string;
  youTubeId: string;
  title?: string;
};

export type OpusDetailsLabels = {
  back: string;
  metaNumber: string;
  metaDate: string;
  metaGenre: string;
  viewSheetMusic: string;
  compositionsTitle: string;
  videosTitle: string;
  placeholderTitle: string;
  placeholderSubtitle: string;
  placeholderImageAlt: string;
  videoTitleFallback: string;
};

export interface OpusDetailsProps {
  name: string;
  number: string;
  year?: string;
  genre?: string;
  movements?: string[];
  sheetMusic?: MusicItem | null;
  introDescription: TipTapDoc | null;
  compositions?: OpusComposition[];
  videos?: OpusVideo[];
  gallery?: OpusGalleryItem[];
  backHref: string;
  labels: OpusDetailsLabels;
}
