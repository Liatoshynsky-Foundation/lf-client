import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    py: {
      xs: '24px',
      md: '40px'
    }
  },

  imageWrapper: {
    width: {
      xs: '200px',
      md: '288px'
    },
    mb: '16px'
  },

  title: {
    fontFamily: 'Oswald',
    fontSize: {
      xs: '32px',
      md: '40px'
    },
    fontWeight: 700,
    lineHeight: '120%',
    color: 'black',
    mb: '12px'
  },

  subtitle: {
    fontFamily: 'Mulish',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '150%',
    color: 'brown.500',
    maxWidth: '420px'
  }
};
