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
};

export type CompositionWithNotes = {
  composition: string;
  notes: Notes[];
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
