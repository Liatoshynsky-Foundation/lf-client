'use client';
import { createTheme } from '@mui/material';
import colors from './colors';
import { Oswald, Mulish } from 'next/font/google';
export const oswald = Oswald({ subsets: ['latin'] });
export const mulish = Mulish({ subsets: ['latin'] });

const buttonColor = {
  ...colors,
  backgroundWhite: '#fcfcfc',
  primaryFilledHover: '#342921',
  primaryActiveFilled: '#5e554e',
  primaryOutlinedHover: '#efedea',
  primaryOutlinedActive: '#d6d4d2',
  secondaryHover: '#d3cdc6',
  backgroundActive: '#0a0601',
  disabledText: '#757780',
  disabledBorder: '#757780',
  tertiary: '#FCBD28'
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.black,
      contrastText: colors.white
    },
    secondary: {
      main: colors.blue[800],
      contrastText: colors.white
    },
    error: {
      main: colors.red[600]
    },
    warning: {
      main: colors.yellow[500],
      dark: colors.burgundy[700]
    },
    text: {
      primary: colors.black,
      secondary: colors.blue[800],
      disabled: colors.blue[200]
    },
    background: {
      default: colors.white
    },
    ...colors
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
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          width: 163,
          height: 56,
          padding: '14px 32px',
          fontWeight: 500,
          fontSize: '1rem',
          textTransform: 'none'
        }
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: buttonColor.black,
            color: buttonColor.backgroundWhite,
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryFilledHover
            },
            '&.Mui-disabled': {
              backgroundColor: colors.blue['300'],
              color: buttonColor.disabledText
            },
            '&:active:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryActiveFilled
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: buttonColor.black,
            color: buttonColor.black,
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryOutlinedHover
            },
            '&.Mui-disabled': {
              backgroundColor: buttonColor.backgroundWhite,
              color: buttonColor.disabledText,
              borderColor: buttonColor.disabledBorder
            },
            '&:active:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryOutlinedActive
            }
          }
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            color: buttonColor.black,
            backgroundColor: 'transparent',
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryOutlinedHover
            },
            '&.Mui-disabled': {
              colors: buttonColor.disabledText
            },
            '&:active:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryOutlinedActive
            }
          }
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: buttonColor.backgroundWhite,
            borderColor: buttonColor.black,
            color: buttonColor.black,
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryOutlinedHover
            },
            '&.Mui-disabled': {
              backgroundColor: colors.blue[300],
              color: buttonColor.disabledText
            },
            '&:active:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryOutlinedActive
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            borderColor: buttonColor.backgroundWhite,
            color: buttonColor.backgroundWhite,
            backgroundColor: buttonColor.black,
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryFilledHover
            },
            '&.Mui-disabled': {
              borderColor: buttonColor.black,
              color: buttonColor.disabledText
            },
            '&:active:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryActiveFilled
            }
          }
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: {
            color: buttonColor.backgroundWhite,
            backgroundColor: 'transparent',
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryActiveFilled
            },
            '&.Mui-disabled': {
              color: buttonColor.disabledText
            },
            '&:active:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryActiveFilled
            }
          }
        },
        {
          props: { variant: 'contained', color: 'tertiary' },
          style: {
            backgroundColor: buttonColor.tertiary,
            color: buttonColor.black,
            '&:hover:not(.Mui-disabled)': {
              backgroundColor: buttonColor.black,
              color: buttonColor.backgroundWhite
            },
            '&.Mui-disabled': {
              borderColor: colors.blue[300],
              color: buttonColor.disabledText
            },
            '&:active:not(.Mui-disabled)': {
              backgroundColor: buttonColor.primaryActiveFilled
            }
          }
        }
      ]
    }
  }
});

export default theme;
