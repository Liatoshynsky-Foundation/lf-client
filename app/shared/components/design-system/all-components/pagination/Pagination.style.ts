import type { SxProps, Theme } from '@mui/material';

import { mainHexPallete } from '../theme/colors';

export type PaginationItemType = 'page' | 'previous' | 'next';

const responsiveSize: SxProps<Theme> = {
  width: { xs: 32, md: 32, lg: 40 },
  height: { xs: 32, md: 32, lg: 40 }
};

const arrowButtonBase: SxProps<Theme> = {
  ...responsiveSize,
  border: `1px solid ${mainHexPallete.black}`,
  borderRadius: '50%'
};

export const paginationStyles: {
  item: Record<PaginationItemType, SxProps<Theme>>;
} = {
  item: {
    page: {
      ...responsiveSize,
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
