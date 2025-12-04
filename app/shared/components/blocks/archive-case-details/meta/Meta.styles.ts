import type { SxProps, Theme } from '@mui/material/styles';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '2 / 4',
      lg: '2 / 5'
    },
    gridRow: '1',
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      mt: {
        xs: '24px',
        md: '32px'
      }
    }
  },

  metaBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },

  metaLabel: {
    fontFamily: 'Mulish',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    color: mainHexPallete.brown[500]
  },

  metaValue: {
    fontFamily: 'Mulish',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '110%',
    color: mainHexPallete.black
  }
};
