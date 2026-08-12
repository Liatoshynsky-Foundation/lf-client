import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'black'
  },

  iframe: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    border: 0
  }
};
