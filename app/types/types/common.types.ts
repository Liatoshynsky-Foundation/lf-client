import { Breakpoint } from '@mui/material';

export interface ElementSizes {
  width: Partial<Record<Breakpoint, number>>;
  height: Partial<Record<Breakpoint, number>>;
}
