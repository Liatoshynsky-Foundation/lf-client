import type { FullColumnWidths, PartialColumnWidths } from '~/types/types/tableColumnWidth.types';

export type ColumnKey = 'name' | 'author' | 'sortableYear' | 'actions';

export const DESKTOP_COLUMN_WIDTHS: FullColumnWidths<ColumnKey> = {
  name: 'auto',
  author: '232px',
  sortableYear: '104px',
  actions: '261px'
};

export const LAPTOP_COLUMN_WIDTHS: FullColumnWidths<ColumnKey> = {
  name: 'auto',
  author: '232px',
  sortableYear: '96px',
  actions: '261px'
};

export const TABLET_COLUMN_WIDTHS: PartialColumnWidths<ColumnKey> = {
  name: 'auto',
  actions: '112px'
};

export const MOBILE_COLUMN_WIDTHS: PartialColumnWidths<ColumnKey> = {
  name: 'auto',
  actions: '72px'
};
