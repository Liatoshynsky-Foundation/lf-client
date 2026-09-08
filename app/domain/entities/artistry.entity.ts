import { RichContent } from '~/shared/components/design-system/all-components/content-block/ContentBlock';

export interface OpusVideoItem {
  _id: string;
  youTubeId: string;
  title?: string | null;
}

interface BaseArtistryEntity {
  _id: string;
  name: string;
  genre?: string | null;
}

interface BaseMediaItem {
  name?: string | null;
  url?: string | null;
}

export type AudioItem = BaseMediaItem;

export interface MusicItem extends BaseMediaItem {
  fileName?: string | null;
  publishDate?: string | null;
}

export interface CompositionItem extends BaseArtistryEntity {
  year?: number | null;
  audioAvailable: boolean;
  sheetAvailable: boolean;
  audios?: AudioItem[] | null;
  sheetMusic?: MusicItem[] | null;
}

export type CompositionDetailsSlice = Omit<CompositionItem, 'audioAvailable' | 'audios'>;

export interface ImageCrop {
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface OpusGalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  crop?: ImageCrop;
}

export interface Opus extends BaseArtistryEntity {
  number: number;
  numberKind: string;
  additionalText?: string | null;
  title: string;
  creationYear: string;
  endYear?: string | null;
  slug: string;
  movements?: string[] | null;
  introDescription?: RichContent | null;
  description?: string | null;
  videos?: OpusVideoItem[] | null;
  sheetMusic?: MusicItem | null;
  gallery?: OpusGalleryItem[] | null;
}
