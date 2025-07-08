import { Breakpoint } from '@mui/material';

export interface ElementSizes {
  width: Partial<Record<Breakpoint, number>>;
  height: Partial<Record<Breakpoint, number>>;
}

export type ButtonGroupSizeOptions = 'small' | 'big';
export type ButtonGroupPaletteOptions = 'primary' | 'secondary';

export type ScrollDirection = 'up' | 'down';
