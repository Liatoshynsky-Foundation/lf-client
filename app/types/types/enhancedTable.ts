import { AudioItem, MusicItem } from '~/domain/entities/artistry.entity';

export type ColumnWidths = Record<string, string | number>;

export type CollapsibleGroupColumnMeta<T> = {
  isGroupLabelColumn?: boolean;
  groupLabelContent?: React.ReactNode;
  groupLabelContentFactory?: (groupItems: T[]) => React.ReactNode;
  groupCellRenderer?: () => React.ReactNode;
};

export type RowData = {
  id: string;
  [key: string]: unknown;
};

export type Music = {
  id: string;
  opus?: string;
  opusName: string;
  opusTitle?: string;
  opusYear?: number | string;
  opusGenres?: string[];
  slug: string;
  compositionName: string;
  compositionYear?: number | null;
  compositionGenre?: string[];
  audioAvailable: boolean;
  sheetAvailable: boolean;
  sheetMusic?: MusicItem[] | null;
  audios?: AudioItem[] | null;
  opusId?: string;
  youtubeUrl?: string | null;
};

export type CompositionWithNotes = {
  composition: string;
  notes: MusicItem[];
};

export type WorkTable = {
  id: string;
  name: string;
  author: string;
  year: number | string;
  sortableYear?: number;
  url: string | null;
  isPreview: boolean;
};
