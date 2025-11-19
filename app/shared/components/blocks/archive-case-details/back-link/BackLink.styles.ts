import type { SxProps, Theme } from '@mui/material/styles';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles: Record<string, SxProps<Theme>> = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 3',
      md: '1 / 4'
    },
    marginBottom: {
      xs: '8px',
      md: '0px'
    }
  },

  link: {
    padding: '0px',
    gap: '0px',
    transition: 'border-bottom 0.3s ease-in-out',
    borderBottom: '1px solid transparent',
    '&:hover': {
      borderBottom: `1px solid ${mainHexPallete.blue[800]}`
    }
  },

  label: {
    fontSize: '16px',
    lineHeight: '150%',
    fontWeight: 500,
    color: mainHexPallete.blue[800],
    '&:hover': {
      borderBottom: 'none'
    }
  },

  icon: {
    flexShrink: 0
  }
};
