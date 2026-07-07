import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  footer: {
    width: '100%',
    maxWidth: '100%',
    color: 'black',
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      md: 'repeat(2, minmax(min-content, max-content))',
      lg: 'repeat(4, minmax(min-content, max-content))'
    },
    gap: {
      xs: '44px',
      md: '48px 73px',
      lg: '48px',
      xl: '80px',
      xxl: '56px',
      ultra: '85px'
    },
    fontFamily: 'Mulish, sans-serif',
    justifySelf: {
      xs: 'start',
      sm: 'end',
      md: 'center'
    }
  },
  column: {
    maxWidth: '210px',
    fontSize: '16px'
  },
  heading: {
    marginBottom: '20px',
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
