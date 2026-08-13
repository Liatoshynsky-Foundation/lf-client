import type { RichContent } from '~/shared/components/design-system/all-components/content-block/ContentBlock';

export type OpusComposition = {
  id: string;
  index: number;
  title: string;
  sheetMusicUrl?: string;
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
  title: string;
  number: string;
  creationDate?: string;
  genre?: string;
  movements?: string[];
  sheetMusicUrl?: string;
  description?: RichContent | null;
  compositions?: OpusComposition[];
  videos?: OpusVideo[];
  backHref: string;
  labels: OpusDetailsLabels;
}
