import { createTheme } from '@mui/material';
import { Mulish, Oswald } from 'next/font/google';

import colors from './colors';

export const oswald = Oswald({ subsets: ['latin'] });
export const mulish = Mulish({ subsets: ['latin'] });

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    ultra: true;
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.mainHexPallete.black,
      contrastText: colors.mainHexPallete.white
    },
    secondary: {
      main: colors.mainHexPallete.blue[800],
      contrastText: colors.mainHexPallete.white
    },
    error: {
      main: colors.mainHexPallete.red[600]
    },
    warning: {
      main: colors.mainHexPallete.yellow[500],
      dark: colors.mainHexPallete.burgundy[700]
    },
    text: {
      primary: colors.mainHexPallete.black,
      secondary: colors.mainHexPallete.blue[800],
      disabled: colors.mainHexPallete.blue[200]
    },
    background: {
      default: colors.mainHexPallete.white
    },
    ...colors.mainHexPallete
  },
  breakpoints: {
    values: {
      ultra: 1920,
      xxl: 1728,
      xl: 1448,
      lg: 1280,
      md: 1024,
      sm: 768,
      xs: 0
    }
  },
  typography: {
    h1: {
      fontFamily: oswald.style.fontFamily,
      fontSize: '116px',
      fontWeight: 700,
      lineHeight: 'normal',
      letterSpacing: '0px'
    },
    h2: {
      fontFamily: oswald.style.fontFamily,
      fontSize: '64px',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: '0px'
    },
    h3: {
      fontFamily: oswald.style.fontFamily,
      fontSize: '64px',
      fontWeight: 400,
      lineHeight: 'normal',
      letterSpacing: '0px'
    },
    h4: {
      fontFamily: oswald.style.fontFamily,
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 'normal',
      letterSpacing: '0px'
    },
    h5: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '140%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    body1: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '160%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    body2: {
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '160%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    subtitle1: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '160%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    caption: {
      fontSize: '16px',
      fontWeight: 500,
      fontStyle: 'italic',
      lineHeight: '140%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },

    customSemiBold20: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '160%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    customBold20: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '140%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    customItalic18: {
      fontSize: '18px',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: '160%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    customMedium18: {
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '150%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    customMedium16: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '150%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    customItalic16: {
      fontSize: '16px',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 'normal',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    },
    customItalic14: {
      fontSize: '14px',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: '140%',
      letterSpacing: '0px',
      fontFamily: mulish.style.fontFamily
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          customSemiBold20: 'p',
          customBold20: 'p',
          customItalic18: 'p',
          customMedium18: 'p',
          customMedium16: 'p',
          customItalic16: 'p',
          customItalic14: 'p'
        }
      }
    }
  }
});
