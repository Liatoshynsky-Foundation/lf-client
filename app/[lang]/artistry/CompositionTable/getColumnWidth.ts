import {
  DESKTOP_COLUMN_WIDTHS,
  type FullColumnWidths,
  LAPTOP_COLUMN_WIDTHS,
  MOBILE_COLUMN_WIDTHS,
  type PartialColumnWidths,
  TABLET_COLUMN_WIDTHS
} from './tableColumnWidth';

type Breakpoints = {
  isDesktop: boolean;
  isLaptopAndAbove: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

export const getColumnWidths = (bp: Breakpoints): FullColumnWidths | PartialColumnWidths => {
  if (bp.isDesktop) return DESKTOP_COLUMN_WIDTHS;
  if (bp.isLaptop) return LAPTOP_COLUMN_WIDTHS;
  if (bp.isTablet) return TABLET_COLUMN_WIDTHS;
  if (bp.isMobile) return MOBILE_COLUMN_WIDTHS;
  return MOBILE_COLUMN_WIDTHS;
};
