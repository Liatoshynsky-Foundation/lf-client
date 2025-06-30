import type { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '../theme/colors';

export type PaginationItemType = 'page' | 'previous' | 'next';

const commonSize: SxProps<Theme> = {
  width: 40,
  height: 40
};

const arrowButtonBase: SxProps<Theme> = {
  ...commonSize,
  border: `1px solid ${mainHexPallete.black}`,
  borderRadius: '50%'
};

export const paginationStyles: {
  item: Record<PaginationItemType, SxProps<Theme>>;
} = {
  item: {
    page: {
      ...commonSize,
      border: 'none',
      borderRadius: '50%',
      '&.Mui-selected': {
        backgroundColor: mainHexPallete.blue[200]
      }
    },
    previous: {
      ...arrowButtonBase,
      mr: '32px'
    },
    next: {
      ...arrowButtonBase,
      ml: '32px'
    }
  }
};
