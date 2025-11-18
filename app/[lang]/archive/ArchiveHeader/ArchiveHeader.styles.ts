import type { SxProps, Theme } from '@mui/material/styles';

import { mainHexPallete } from '~/ds-components/theme/colors';

export const styles: Record<string, SxProps<Theme>> = {
  headerContainer: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    gridTemplateRows: 'min-content',
    alignContent: 'start',
    marginBottom: {
      xs: '56px',
      sm: '50px',
      md: '0px',
      lg: '0px'
    }
  },

  contentWrapper: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / -1',
      md: '1 / 9',
      lg: '1 / 8'
    }
  },

  title: {
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontSize: {
      xs: '40px',
      sm: '40px',
      md: '64px',
      lg: '64px'
    },
    lineHeight: '120%',
    letterSpacing: '0%',
    color: mainHexPallete.black,
    marginBottom: '8px'
  },

  description: {
    fontFamily: 'Mulish',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0px',
    color: mainHexPallete.black,
    maxWidth: {
      xs: '272px',
      sm: '343px',
      md: '449px',
      lg: '515px',
      xl: '637px'
    }
  },

  searchWrapper: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / -1',
      md: '9 / -1',
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
      md: '24px',
      lg: '0px'
    },
    paddingTop: {
      lg: '24px'
    },
    width: {
      md: '344px',
      lg: '352px',
      xl: '501px'
    }
  },

  searchInput: {
    width: {
      xs: '272px',
      sm: '344px',
      md: '344px',
      lg: '351px',
      xl: '501px'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '7px',
      backgroundColor: mainHexPallete.white,
      fontFamily: 'Mulish, sans-serif',
      fontSize: '16px',
      height: '40px',
      '& fieldset': {
        borderColor: `${mainHexPallete.blue[700]} !important`,
        borderWidth: '1px'
      },
      '&:hover fieldset': {
        borderColor: mainHexPallete.blue[700]
      },
      '&.Mui-focused fieldset': {
        borderColor: mainHexPallete.blue[700]
      }
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Mulish, sans-serif',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      color: mainHexPallete.blue[700],
      WebkitTextFillColor: mainHexPallete.blue[700],
      padding: '8px 16px',
      '&::placeholder': {
        color: mainHexPallete.blue[700],
        opacity: 1,
        WebkitTextFillColor: mainHexPallete.blue[700],
        fontFamily: 'Mulish, sans-serif',
        fontSize: '16px',
        fontWeight: 500
      }
    },
    '& .MuiInputAdornment-root svg': {
      width: '18px',
      height: '18px',
      color: mainHexPallete.blue[700]
    }
  }
};
