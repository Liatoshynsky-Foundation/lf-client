import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  card: {
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-2px)'
    },
    '&:hover .fund-line': {
      transform: 'skewX(-3deg)',
      transition: 'transform 0.3s ease'
    }
  },

  fundNumber: {
    fontFamily: 'Mulish',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '130%',
    letterSpacing: '0px',
    color: '#190D03',
    marginBottom: '6px'
  },

  fundTitle: {
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '120%',
    letterSpacing: '0%',
    textTransform: 'uppercase',
    color: '#412B21',
    marginBottom: '8px'
  },

  fundLine: {
    width: '100%',
    height: '5px',
    backgroundColor: '#FCBD28',
    transition: 'transform 0.3s ease',
    transformOrigin: 'left center',
    marginBottom: '8px'
  }
};
