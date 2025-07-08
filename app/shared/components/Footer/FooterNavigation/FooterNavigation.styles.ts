import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  footer: {
    width: '100%',
    color: '#190D03',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
    fontFamily: 'Mulish, sans-serif',

    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '48px'
    },

    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  },
  column: {
    fontSize: '14px'
  },
  heading: {
    marginBottom: '8px'
  },
  list: {
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
