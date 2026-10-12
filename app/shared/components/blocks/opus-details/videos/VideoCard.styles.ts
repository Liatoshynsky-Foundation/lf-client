import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  card: {
    width: '100%'
  },

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
  },

  caption: {
    marginTop: '16px',
    color: 'text.secondary',
    fontStyle: 'italic',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    fontWeight: 400,
    fontSize: '17px'
  }
};
