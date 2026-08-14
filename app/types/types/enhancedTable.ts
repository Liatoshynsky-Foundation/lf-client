import { Notes } from './getNotes.types';

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

type AudioTrack = {
  name: string;
  url: string;
};

export type Music = {
  id: string;
  name: string;
  year?: number | null;
  opus?: string;
  opusTitle?: string;
  genre?: string[];
  opusYear?: number | string;
  opusGenres?: string[];
  audioAvailable: boolean;
  sheetAvailable: boolean;
  sheetMusic?: Notes[];
  audios?: AudioTrack[] | null;
  opusId?: string;
};

export type CompositionWithNotes = {
  composition: string;
  notes: Notes[];
};

export type CompositionItemFrontend = {
  _id: string;
  name: string;
  year?: number | null;
  genre?: string | null;
  audioAvailable: boolean;
  sheetAvailable: boolean;
  sheetMusic: Notes[] | null;
  audios?: AudioTrack[] | null;
};

export type OpusGroupFrontend = {
  _id: string;
  number: number;
  numberKind: string;
  title: string;
  name: string;
  additionalText?: string | null;
  creationYear: string;
  endYear?: string | null;
  genre: string;
  status: string;
  compositions: CompositionItemFrontend[];
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
