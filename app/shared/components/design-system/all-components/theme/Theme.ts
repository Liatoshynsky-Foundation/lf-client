import { createTheme, PaletteColorOptions } from '@mui/material';
import { Mulish, Oswald } from 'next/font/google';

import { mainHexPallete, rgbButtonColors } from '~/ds-components/theme/colors';
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

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

declare module '@mui/material' {
  interface TypographyPropsVariantOverrides {
    customSemiBold20: true;
    customBold20: true;
    customItalic18: true;
    customMedium18: true;
    customMedium16: true;
    customItalic16: true;
    customItalic14: true;
    customSemiBold18: true;
    customButtonLarge: true;
    customButtonMedium: true;
    customButtonSmall: true;
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    customSemiBold20?: React.CSSProperties;
    customBold20?: React.CSSProperties;
    customItalic18?: React.CSSProperties;
    customMedium18?: React.CSSProperties;
    customMedium16?: React.CSSProperties;
    customItalic16?: React.CSSProperties;
    customCaption?: React.CSSProperties;
    customItalic14?: React.CSSProperties;
    customSemiBold18?: React.CSSProperties;
    customButtonLarge?: React.CSSProperties;
    customButtonMedium?: React.CSSProperties;
    customButtonSmall?: React.CSSProperties;
  }
  interface TypographyVariants {
    customSemiBold20: React.CSSProperties;
    customBold20: React.CSSProperties;
    customItalic18: React.CSSProperties;
    customMedium18: React.CSSProperties;
    customMedium16: React.CSSProperties;
    customItalic16: React.CSSProperties;
    customCaption: React.CSSProperties;
    customItalic14: React.CSSProperties;
    customSemiBold18: React.CSSProperties;
    customButtonLarge: React.CSSProperties;
    customButtonMedium: React.CSSProperties;
    customButtonSmall: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    customSemiBold20?: React.CSSProperties;
    customBold20?: React.CSSProperties;
    customItalic18?: React.CSSProperties;
    customMedium18?: React.CSSProperties;
    customMedium16?: React.CSSProperties;
    customItalic16?: React.CSSProperties;
    customCaption?: React.CSSProperties;
    customItalic14?: React.CSSProperties;
    customSemiBold18?: React.CSSProperties;
    customButtonLarge?: React.CSSProperties;
    customButtonMedium?: React.CSSProperties;
    customButtonSmall?: React.CSSProperties;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tertiary: true;
  }
}

export const buttonSizeStyles = {
  small: {
    height: '32px',
    minWidth: '100px',
    width: 'fit-content',
    padding: '4px 12px 4px 12px'
  },
  medium: {
    height: '40px',
    minWidth: '137px',
    width: 'fit-content',
    padding: '8px 24px 8px 24px'
  },
  large: {
    height: '56px',
    minWidth: '163px',
    width: 'fit-content',
    padding: '14px 32px 14px 32px'
  }
};

declare module '@mui/material/styles' {
  interface CustomPalette {
    tertiary: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: mainHexPallete.black,
      contrastText: mainHexPallete.white
    },
    secondary: {
      main: mainHexPallete.blue[800],
      contrastText: mainHexPallete.white
    },
    error: {
      main: mainHexPallete.red[600]
    },
    warning: {
      main: mainHexPallete.yellow[500],
      dark: mainHexPallete.burgundy[700]
    },
    text: {
      primary: mainHexPallete.black,
      secondary: mainHexPallete.blue[800],
      disabled: mainHexPallete.blue[200]
    },
    background: {
      default: mainHexPallete.white
    },
    tertiary: createColor(mainHexPallete.yellow[500]),
    ...mainHexPallete
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
    customSemiBold18: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '155%',
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
    },
    customButtonLarge: {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '155%',
      letterSpacing: '0px'
    },
    customButtonMedium: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0%'
    },
    customButtonSmall: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '140%',
      letterSpacing: '0px'
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
          textTransform: 'none',
          borderRadius: '28px'
        }
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: rgbButtonColors.primaryFilledNormalBackground,
            color: rgbButtonColors.primaryFilledTextColor,
            '&:hover': {
              backgroundColor: rgbButtonColors.primaryFilledHoveredBackground
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.primaryFilledHoveredBackground
            },
            '&:active': {
              backgroundColor: rgbButtonColors.primaryFilledPressedBackground
            },
            '&:disabled': {
              backgroundColor: rgbButtonColors.primaryFilledDisabledBackground,
              color: rgbButtonColors.primaryOutlinedDisabledTextColor
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            backgroundColor: rgbButtonColors.primaryOutlinedNormalBackground,
            border: `1px solid ${rgbButtonColors.primaryOutlinedBorderColor}`,
            color: rgbButtonColors.primaryOutlinedTextColor,
            '&:hover': {
              backgroundColor: rgbButtonColors.primaryOutlinedHoveredBackground
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.primaryOutlinedNormalBackground
            },
            '&:active': {
              backgroundColor: rgbButtonColors.primaryOutlinedPressedBackground
            },
            '&:disabled': {
              backgroundColor: rgbButtonColors.primaryOutlinedDisabledBackground,
              border: `1px solid ${rgbButtonColors.primaryOutlinedDisabledBorderColor}`,
              color: rgbButtonColors.primaryOutlinedDisabledTextColor
            }
          }
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            backgroundColor: rgbButtonColors.primaryTextNormal,
            color: rgbButtonColors.primaryTextColor,
            '&:hover': {
              backgroundColor: rgbButtonColors.primaryTextHovered
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.primaryTextPressed
            },
            '&:active': {
              backgroundColor: rgbButtonColors.primaryOutlinedNormalBackground
            },
            '&:disabled': {
              backgroundColor: rgbButtonColors.primaryTextDisabled,
              color: rgbButtonColors.primaryTextDisabledTextColor
            }
          }
        },

        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: rgbButtonColors.secondaryFilledNormalBackground,
            color: rgbButtonColors.secondaryFilledTextColor,
            '&:hover': {
              backgroundColor: rgbButtonColors.secondaryFilledHoveredBackground
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.secondaryFilledPressedBackground
            },
            '&:active': {
              backgroundColor: rgbButtonColors.secondaryFilledPressedBackground
            },
            '&:disabled': {
              backgroundColor: rgbButtonColors.secondaryFilledDisabledBackground,
              color: rgbButtonColors.secondaryFilledisabledTextColor
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            backgroundColor: rgbButtonColors.secondaryOutlinedNormalBackground,
            border: `1px solid ${rgbButtonColors.secondaryOutlinedBorderColor}`,
            color: rgbButtonColors.secondaryOutlinedTextColor,
            '&:hover': {
              backgroundColor: rgbButtonColors.secondaryOutlinedHoveredBackground
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.secondaryOutlinedPressedBackground
            },
            '&:active': {
              backgroundColor: rgbButtonColors.secondaryOutlinedPressedBackground
            },
            '&:disabled': {
              backgroundColor: rgbButtonColors.secondaryOutlinedDisabledBackground,
              border: `1px solid ${rgbButtonColors.primaryOutlinedDisabledTextColor}`,
              color: rgbButtonColors.primaryOutlinedDisabledTextColor
            }
          }
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: {
            backgroundColor: rgbButtonColors.secondaryTextNormal,
            color: rgbButtonColors.secondaryTextColor,
            '&:hover': {
              backgroundColor: rgbButtonColors.secondaryTextHovered
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.secondaryTextPressed
            },
            '&:active': {
              backgroundColor: rgbButtonColors.secondaryTextPressed
            },
            '&:disabled': {
              backgroundColor: 'transparent',
              color: rgbButtonColors.secondaryTextDisabledTextColor
            }
          }
        },

        {
          props: { variant: 'contained', color: 'tertiary' },
          style: {
            backgroundColor: rgbButtonColors.tertiaryNormalBackground,
            color: rgbButtonColors.tertiaryNormalTextColor,
            '&:hover': {
              backgroundColor: rgbButtonColors.tertiaryHoveredBackground,
              color: rgbButtonColors.tertiaryHoveredTextColor
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.tertiaryHoveredBackground,
              color: rgbButtonColors.tertiaryHoveredTextColor
            },
            '&:active': {
              backgroundColor: rgbButtonColors.tertiaryPressedBackground,
              color: rgbButtonColors.tertiaryHoveredTextColor
            },
            '&:disabled': {
              backgroundColor: rgbButtonColors.tertiaryDisabledBackground,
              color: rgbButtonColors.primaryOutlinedDisabledTextColor
            }
          }
        },
        {
          props: { size: 'small' },
          style: buttonSizeStyles.small
        },
        {
          props: { size: 'medium' },
          style: buttonSizeStyles.medium
        },
        {
          props: { size: 'large' },
          style: buttonSizeStyles.large
        }
      ]
    }
  }
});
