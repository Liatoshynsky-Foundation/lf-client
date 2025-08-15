import type { Breakpoints } from '~/types/types/common.types';

import {
  DESKTOP_COLUMN_WIDTHS,
  type FullColumnWidths,
  LAPTOP_COLUMN_WIDTHS,
  MOBILE_COLUMN_WIDTHS,
  type PartialColumnWidths,
  TABLET_COLUMN_WIDTHS
} from '~/shared/components/tables/CompositionTable/tableColumnWidth';

export const getColumnWidths = (bp: Breakpoints): FullColumnWidths | PartialColumnWidths => {
  if (bp.isDesktop) return DESKTOP_COLUMN_WIDTHS;
  if (bp.isLaptop) return LAPTOP_COLUMN_WIDTHS;
  if (bp.isTablet) return TABLET_COLUMN_WIDTHS;
  if (bp.isMobile) return MOBILE_COLUMN_WIDTHS;
  return MOBILE_COLUMN_WIDTHS;
};
