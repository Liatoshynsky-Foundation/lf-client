import type { ColumnKey } from './tableColumnWidth';
import {
  DESKTOP_COLUMN_WIDTHS,
  LAPTOP_COLUMN_WIDTHS,
  MOBILE_COLUMN_WIDTHS,
  TABLET_COLUMN_WIDTHS
} from './tableColumnWidth';
import type { ColumnWidths } from '~/types/types/tableColumnWidth.types';

import { createGetColumnWidths } from '~/lib/utils/getColumnWidth';

const widthsMap: ColumnWidths<ColumnKey> = {
  DESKTOP: DESKTOP_COLUMN_WIDTHS,
  LAPTOP: LAPTOP_COLUMN_WIDTHS,
  TABLET: TABLET_COLUMN_WIDTHS,
  MOBILE: MOBILE_COLUMN_WIDTHS
};

export const getCompositionColumnWidths = createGetColumnWidths<ColumnKey>(widthsMap);
