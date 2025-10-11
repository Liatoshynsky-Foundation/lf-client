import type { Breakpoints } from '~/types/types/common.types';
import type { ColumnWidths } from '~/types/types/tableColumnWidth.types';

export const createGetColumnWidths = <T extends string>(widths: ColumnWidths<T>) => {
  return (bp: Breakpoints): ColumnWidths<T>[keyof ColumnWidths<T>] => {
    if (bp.isDesktop) return widths.DESKTOP;
    if (bp.isLaptop) return widths.LAPTOP;
    if (bp.isTablet) return widths.TABLET;
    if (bp.isMobile) return widths.MOBILE;
    return widths.MOBILE;
  };
};
