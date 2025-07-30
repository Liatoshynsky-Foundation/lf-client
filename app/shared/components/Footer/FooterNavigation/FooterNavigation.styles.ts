import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  footer: {
    width: '100%',
    color: '#190D03',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '48px',
    fontFamily: 'Mulish, sans-serif',

    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },

    '@media (min-width: 1280px)': {
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  },
  column: {
    fontSize: '16px'
  },
  heading: {
    marginBottom: '16px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
};
