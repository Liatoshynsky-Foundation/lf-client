import type { FullColumnWidths } from '~/types/types/tableColumnWidth.types';

export type ColumnKey = 'code' | 'name' | 'date' | 'sheets' | 'content' | 'actions';

export const DESKTOP_COLUMN_WIDTHS: FullColumnWidths<ColumnKey> = {
  name: '232px',
  code: '248px',
  date: '160px',
  sheets: '104px',
  content: 'auto',
  actions: '261px'
};

export const LAPTOP_COLUMN_WIDTHS: FullColumnWidths<ColumnKey> = {
  name: '184px',
  code: '234px',
  date: '109px',
  sheets: '96px',
  content: 'auto',
  actions: '129px'
};
