import type { SxProps, Theme } from '@mui/material/styles';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles = (theme: Theme): Record<string, SxProps<Theme>> => ({
  headerContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    gridTemplateRows: 'min-content',
    alignContent: 'start',
    marginBottom: {
      xs: '32px',
      sm: '56px',
      md: '32px',
      lg: '8px'
    }
  },

  contentWrapper: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / -1',
      md: '1 / 8',
      lg: '1 / 8'
    }
  },

  title: {
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontSize: '64px',
    lineHeight: '120%',
    letterSpacing: '0%',
    color: '#190D03',
    marginBottom: {
      xs: '16px',
      sm: '20px',
      md: '24px',
      lg: '8px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '40px'
    }
  },

  description: {
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0px',
    color: '#000000',
    maxWidth: {
      xs: '100%',
      md: '500px',
      lg: '630px'
    }
  },

  searchWrapper: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / -1',
      md: '1 / -1',
      lg: '9 / -1'
    },
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'flex-end'
    },
    marginTop: {
      xs: '32px',
      sm: '32px',
      md: '32px',
      lg: '0px'
    },
    paddingTop: {
      lg: '24px'
    }
  },

  searchInput: {
    width: {
      xs: '100%',
      md: '360px',
      lg: '500px'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '7px',
      backgroundColor: mainHexPallete.white,
      fontFamily: 'Mulish, sans-serif',
      fontSize: '16px',
      height: '40px',
      '& fieldset': {
        borderColor: '#63666E !important',
        borderWidth: '1px'
      },
      '&:hover fieldset': {
        borderColor: '#63666E'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#63666E'
      }
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Mulish, sans-serif',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      color: '#63666E',
      '-webkit-text-fill-color': '#63666E',
      padding: '8px 16px',
      '&::placeholder': {
        color: '#63666E',
        opacity: 1,
        '-webkit-text-fill-color': '#63666E',
        fontFamily: 'Mulish, sans-serif',
        fontSize: '16px',
        fontWeight: 500
      }
    },
    '& .MuiInputAdornment-root svg': {
      width: '18px',
      height: '18px',
      color: '#63666E'
    }
  }
});
