import type { SxProps, Theme } from '@mui/material/styles';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1'
    },
    gridRow: {
      xs: 'auto',
      sm: '3 / 6'
    }
  },

  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    counterReset: 'docs-counter',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  item: {
    position: 'relative',
    display: 'flex',
    gap: '2px',
    alignItems: 'flex-start',
    fontFamily: 'Mulish',

    '&::before': {
      fontSize: '16px',
      lineHeight: '150%',
      fontWeight: 700,
      counterIncrement: 'docs-counter',
      content: 'counter(docs-counter) "."',
      minWidth: '28px',
      color: mainHexPallete.black
    }
  },

  text: {
    flex: 1
  },

  title: {
    fontSize: '16px',
    lineHeight: '150%',
    color: mainHexPallete.black
  }
};
