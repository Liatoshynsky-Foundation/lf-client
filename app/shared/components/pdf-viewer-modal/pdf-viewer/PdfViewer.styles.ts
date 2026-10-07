import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: {
      xs: '100%',
      md: '70%'
    },
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    overflow: 'auto',
    scrollbarWidth: 'none'
  },

  viewer: {
    width: '100%',
    mt: {
      xs: 2,
      sm: 4,
      lg: 0
    },

    '--rpv-core__inner-page-background-color': 'trasparent',

    '& iframe': {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block'
    }
  }
};
