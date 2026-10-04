import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2
  },

  viewer: {
    width: '100%',
    height: '60vh',
    mt: {
      xs: 2,
      sm: 4,
      lg: 0
    },

    '& iframe': {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block'
    }
  }
};
