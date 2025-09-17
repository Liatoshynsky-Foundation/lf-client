import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  footer: {
    maxWidth: '100%',
    marginLeft: {
      lg: 'calc(100%/24)',
      xl: '0'
    },
    color: '#190D03',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: {
      xs: '40px',
      md: '48px 73px',
      lg: '48px',
      xl: '56px'
    },
    fontFamily: 'Mulish, sans-serif',

    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, minmax(min-content, max-content))'
    },

    '@media (min-width: 1280px)': {
      gridTemplateColumns: 'repeat(4, minmax(min-content, max-content))'
    },
    justifySelf: {
      xs: 'start',
      sm: 'end'
    }
  },
  column: {
    maxWidth: '210px',
    fontSize: '16px'
  },
  heading: {
    marginBottom: '16px',
    textWrap: 'nowrap'
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
