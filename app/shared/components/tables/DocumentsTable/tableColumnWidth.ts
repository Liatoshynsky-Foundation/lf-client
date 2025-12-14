import type { FullColumnWidths } from '~/types/types/tableColumnWidth.types';

export type ColumnKey = 'cipher' | 'name' | 'dates' | 'sheets' | 'content' | 'actions';

export const DESKTOP_COLUMN_WIDTHS: FullColumnWidths<ColumnKey> = {
  name: '232px',
  cipher: '248px',
  dates: '160px',
  sheets: '104px',
  content: 'auto',
  actions: '261px'
};

export const LAPTOP_COLUMN_WIDTHS: FullColumnWidths<ColumnKey> = {
  name: '184px',
  cipher: '234px',
  dates: '109px',
  sheets: '96px',
  content: 'auto',
  actions: '129px'
};
