import { createTheme, PaletteColorOptions } from '@mui/material';
import { Mulish, Oswald } from 'next/font/google';

import {
  accordionColorsRgb,
  alertColors,
  badgeColors,
  chipsColors,
  hexButtonGroupColors,
  hexCheckboxColors,
  mainHexPallete,
  rgbaMenuItemColors,
  rgbaSwitchColors,
  rgbaTextFieldColors,
  rgbButtonColors,
  selectorColors,
  tabsColors,
  toolbarColors,
  tooltipColors
} from '~/ds-components/theme/colors';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

export const oswald = Oswald({ subsets: ['latin'] });
export const mulish = Mulish({ subsets: ['latin'] });

export const fontFamilies = {
  body: mulish.style.fontFamily,
  display: oswald.style.fontFamily
};

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

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    discardChangesModal: true;
  }
}

declare module '@mui/material' {
  interface TypographyPropsVariantOverrides {
    displayXl: true;
    displayLg: true;
    displayMd: true;
    bodyLg: true;
    bodyMd: true;
    bodySm: true;
    textMd: true;
    textSm: true;
    h7: true;
    customBold32: true;
    customSemiBold20: true;
    customBold20: true;
    customItalic18: true;
    customMedium18: true;
    customBold16: true;
    customMedium16: true;
    customItalic16: true;
    customItalic14: true;
    customSemiBold16: true;
    customSemiBold18: true;
    customBold25: true;
    customBold48: true;
    customRegular16: true;
    customSemiBold18Compact: true;
  }
}
declare module '@mui/material/styles' {
  interface TypographyVariants {
    displayXl: React.CSSProperties;
    displayLg: React.CSSProperties;
    displayMd: React.CSSProperties;
    bodyLg: React.CSSProperties;
    bodyMd: React.CSSProperties;
    bodySm: React.CSSProperties;
    textMd: React.CSSProperties;
    textSm: React.CSSProperties;
    h7: React.CSSProperties;
    customCaption: React.CSSProperties;
    customBold32: React.CSSProperties;
    customBold20: React.CSSProperties;
    customItalic14: React.CSSProperties;
    customItalic16: React.CSSProperties;
    customItalic18: React.CSSProperties;
    customMedium16: React.CSSProperties;
    customMedium18: React.CSSProperties;
    customSemiBold16: React.CSSProperties;
    customSemiBold18: React.CSSProperties;
    customSemiBold20: React.CSSProperties;
    customBold16: React.CSSProperties;
    customBold25: React.CSSProperties;
    customBold236: React.CSSProperties;
    customBold132: React.CSSProperties;
    customBold114: React.CSSProperties;
    customBold48: React.CSSProperties;
    customRegular16: React.CSSProperties;
    customSemiBold18Compact: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    displayXl?: React.CSSProperties;
    displayLg?: React.CSSProperties;
    displayMd?: React.CSSProperties;
    bodyLg?: React.CSSProperties;
    bodyMd?: React.CSSProperties;
    bodySm?: React.CSSProperties;
    textMd?: React.CSSProperties;
    textSm?: React.CSSProperties;
    h7?: React.CSSProperties;
    customBold32?: React.CSSProperties;
    customSemiBold20?: React.CSSProperties;
    customBold20?: React.CSSProperties;
    customItalic18?: React.CSSProperties;
    customMedium18?: React.CSSProperties;
    customBold16?: React.CSSProperties;
    customMedium16?: React.CSSProperties;
    customItalic16?: React.CSSProperties;
    customCaption?: React.CSSProperties;
    customItalic14?: React.CSSProperties;
    customSemiBold16?: React.CSSProperties;
    customSemiBold18?: React.CSSProperties;
    customBold25: React.CSSProperties;
    customBold236?: React.CSSProperties;
    customBold132?: React.CSSProperties;
    customBold114?: React.CSSProperties;
    customBold48?: React.CSSProperties;
    customRegular16?: React.CSSProperties;
    customSemiBold18Compact?: React.CSSProperties;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    yellow: Record<number, string>;
    blue: Record<number, string>;
    red: Record<number, string>;
    brown: Record<number, string>;
    burgundy: Record<number, string>;
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    yellow?: Record<number, string>;
    blue?: Record<number, string>;
    red?: Record<number, string>;
    brown?: Record<number, string>;
    burgundy?: Record<number, string>;
  }
}

declare module '@mui/material/styles' {
  interface Color {
    250?: string;
    350?: string;
    375?: string;
  }
}

declare module '@mui/material/styles' {
  interface CustomPalette {
    tertiary: PaletteColorOptions;
  }
}

declare module '@mui/material/styles' {
  interface ZIndex {
    introAnimationBackground: number;
    introAnimationExpansion: number;
    mobileOverlay: number;
    headerAppBar: number;
    mobileNavButton: number;
    modalCloseButton: number;
    stickyYearsTab: number;
    cursor: number;
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

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    tertiary: true;
  }
}

export const buttonSizeStyles = {
  small: {
    height: '32px',
    gap: '4px',
    padding: '4px 12px 4px 12px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '140%',
    letterSpacing: '0px'
  },
  medium: {
    height: '40px',
    gap: '4px',
    padding: '8px 24px 8px 24px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '150%',
    letterSpacing: '0%'
  },
  large: {
    height: '56px',
    gap: '8px',
    padding: '14px 32px 14px 32px',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '155%',
    letterSpacing: '0px'
  }
};

const textFieldFontStyles = {
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: '0px',
  fontFamily: mulish.style.fontFamily
};

export const baseTextStyles = {
  fontFamily: fontFamilies.body,
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: 1.5
};

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
  zIndex: {
    introAnimationBackground: 3000,
    introAnimationExpansion: 2999,
    mobileOverlay: 1050,
    headerAppBar: 1100,
    mobileNavButton: 1100,
    modalCloseButton: 100,
    stickyYearsTab: 50,
    cursor: 9000
  },
  typography: {
    fontFamily: fontFamilies.body,
    fontSize: 16,

    displayXl: {
      fontFamily: fontFamilies.display,
      fontSize: '236px',
      fontWeight: 500,
      lineHeight: 1
    },
    displayLg: {
      fontFamily: fontFamilies.display,
      fontSize: '132px',
      fontWeight: 500,
      lineHeight: 1
    },
    displayMd: {
      fontFamily: fontFamilies.display,
      fontSize: '114px',
      fontWeight: 500,
      lineHeight: 1
    },
    h7: {
      fontFamily: fontFamilies.body,
      fontSize: '20px',
      fontStyle: 'bold',
      fontWeight: 700,
      lineHeight: 1.4
    },
    bodyLg: {
      fontFamily: fontFamilies.body,
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: 1.6
    },
    bodyMd: {
      fontFamily: fontFamilies.body,
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: 1.6
    },
    bodySm: {
      fontFamily: fontFamilies.body,
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: 1.6
    },
    textMd: baseTextStyles,
    textSm: {
      ...baseTextStyles,
      fontSize: '14px',
      letterSpacing: '0.17px',
      lineHeight: 1.3
    },

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
      fontWeight: 600,
      lineHeight: '120%',
      marginRight: '5px',
      letterSpacing: '0%'
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
    customBold32: {
      fontFamily: mulish.style.fontFamily,
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '140%',
      letterSpacing: '0px'
    },
    customBold25: {
      fontFamily: mulish.style.fontFamily,
      fontWeight: 700,
      fontSize: '25px',
      lineHeight: '140%',
      letterSpacing: '0px'
    },
    customSemiBold16: {
      fontSize: '16px',
      fontWeight: 600,
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
    customBold16: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '100%',
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
    customBold236: {
      fontFamily: oswald.style.fontFamily,
      fontWeight: 500,
      fontSize: '236px',
      lineHeight: '100%'
    },
    customBold132: {
      fontFamily: oswald.style.fontFamily,
      fontWeight: 500,
      fontSize: '132px',
      lineHeight: '100%'
    },
    customBold114: {
      fontFamily: oswald.style.fontFamily,
      fontWeight: 500,
      fontSize: '114px',
      lineHeight: '100%'
    },
    customBold48: {
      fontFamily: oswald.style.fontFamily,
      fontWeight: 600,
      fontSize: '48px',
      lineHeight: '120%'
    },
    customRegular16: {
      fontFamily: mulish.style.fontFamily,
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0px'
    },
    customSemiBold18Compact: {
      fontFamily: mulish.style.fontFamily,
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '110%',
      letterSpacing: '0px'
    }
  },
  components: {
    // ------------------------------------------------------------------
    // MuiTypography — client's variantMapping takes precedence; admin's
    // mappings for its own new variants (displayXl, bodyLg, etc.) are
    // merged in alongside, since the client never declared those.
    // ------------------------------------------------------------------
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayXl: 'h2',
          displayLg: 'h2',
          displayMd: 'h2',
          bodyLg: 'p',
          bodyMd: 'p',
          bodySm: 'p',
          textMd: 'p',
          textSm: 'p',
          customBold32: 'p',
          customSemiBold20: 'p',
          customBold20: 'p',
          customItalic18: 'p',
          customMedium18: 'p',
          customBold16: 'p',
          customMedium16: 'p',
          customItalic16: 'p',
          customItalic14: 'p',
          customRegular16: 'p',
          customSemiBold18Compact: 'p'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '28px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          },
          whiteSpace: 'nowrap',
          fontFamily: mulish.style.fontFamily
        }
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: mainHexPallete.black,
            color: mainHexPallete.white,
            '&:hover': {
              backgroundColor: rgbButtonColors.primaryFilledHoveredBackground
            },
            '&:focus-visible': {
              backgroundColor: mainHexPallete.black
            },
            '&:active': {
              backgroundColor: mainHexPallete.black
            },
            '&:disabled': {
              backgroundColor: mainHexPallete.blue[300],
              color: mainHexPallete.blue[700]
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            backgroundColor: rgbButtonColors.transparent,
            border: `1px solid ${mainHexPallete.black}`,
            color: mainHexPallete.black,
            '&:hover': {
              backgroundColor: rgbButtonColors.primaryOutlinedHoveredBackground
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.primaryOutlinedHoveredBackground
            },
            '&:active': {
              backgroundColor: rgbButtonColors.primaryOutlinedPressedBackground
            },
            '&:disabled': {
              border: `1px solid ${mainHexPallete.blue[700]}`,
              color: mainHexPallete.blue[700]
            }
          }
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            backgroundColor: rgbButtonColors.transparent,
            color: mainHexPallete.black,
            '&:hover': {
              backgroundColor: rgbButtonColors.primaryOutlinedHoveredBackground
            },
            '&:focus-visible': {
              backgroundColor: rgbButtonColors.primaryOutlinedHoveredBackground
            },
            '&:active': {
              backgroundColor: mainHexPallete.white
            },
            '&:disabled': {
              backgroundColor: mainHexPallete.blue[300],
              color: mainHexPallete.blue[700]
            }
          }
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: mainHexPallete.white,
            color: mainHexPallete.black,
            '&:hover': {
              backgroundColor: mainHexPallete.brown[100]
            },
            '&:focus-visible': {
              backgroundColor: mainHexPallete.brown[200]
            },
            '&:active': {
              backgroundColor: mainHexPallete.brown[200]
            },
            '&:disabled': {
              backgroundColor: mainHexPallete.blue[300],
              color: mainHexPallete.blue[700]
            }
          }
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            backgroundColor: rgbButtonColors.transparent,
            border: `1px solid ${mainHexPallete.white}`,
            color: mainHexPallete.white,
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
              border: `1px solid ${mainHexPallete.blue[700]}`,
              color: mainHexPallete.blue[700]
            }
          }
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: {
            backgroundColor: rgbButtonColors.transparent,
            color: mainHexPallete.white,
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
              color: mainHexPallete.blue[700]
            }
          }
        },
        {
          props: { variant: 'contained', color: 'tertiary' },
          style: {
            backgroundColor: mainHexPallete.yellow[500],
            color: mainHexPallete.black,
            '&:hover': {
              backgroundColor: mainHexPallete.yellow[600],
              color: mainHexPallete.black
            },
            '&:focus-visible': {
              backgroundColor: mainHexPallete.yellow[600],
              color: mainHexPallete.black
            },
            '&:active': {
              backgroundColor: mainHexPallete.yellow[600],
              color: mainHexPallete.black
            },
            '&:disabled': {
              backgroundColor: mainHexPallete.blue[300],
              color: mainHexPallete.blue[700]
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
    },
    MuiInputBase: {
      defaultProps: {
        sx: {
          height: '46px',
          color: mainHexPallete.blue[800],
          WebkitTextFillColor: mainHexPallete.blue[800],
          ...textFieldFontStyles,

          '&:before': {
            borderBottom: `1px solid ${rgbaTextFieldColors.defaultBorderBottom}`
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid ${rgbaTextFieldColors.hoveredBorderBottom}`
          },
          '&.Mui-focused:after': {
            borderBottom: `2px solid ${mainHexPallete.black}`
          },
          '&.Mui-error:before': {
            borderBottom: `2px solid ${rgbaTextFieldColors.errorBorderBottom}`
          },
          '&.Mui-error:after': {
            borderBottom: `2px solid ${rgbaTextFieldColors.errorBorderBottom}`
          },
          '&.Mui-error:hover:before': {
            borderBottom: `2px solid ${rgbaTextFieldColors.errorBorderBottom}`
          },
          '&.Mui-disabled:before': {
            borderBottom: `1px solid ${mainHexPallete.blue[600]}`
          },
          '&:not(.Mui-focused):not(.Mui-error):after': {
            borderBottom: `1px solid ${mainHexPallete.black}`
          },
          '&.Mui-disabled .MuiInputBase-input': {
            color: mainHexPallete.blue[600],
            WebkitTextFillColor: mainHexPallete.blue[600]
          },
          '&.Mui-error .MuiInputBase-input': {
            color: mainHexPallete.black,
            WebkitTextFillColor: mainHexPallete.black
          },
          '&.Mui-focused .MuiInputBase-input': {
            color: mainHexPallete.black,
            WebkitTextFillColor: mainHexPallete.black
          },
          '& .MuiInputBase-input': {
            '&:-webkit-autofill': {
              WebkitBoxShadow: 'transparent',
              WebkitTextFillColor: mainHexPallete.black,
              caretColor: mainHexPallete.black,
              transition: 'background-color 5000s ease-in-out 0s'
            }
          }
        }
      }
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          ...textFieldFontStyles,

          '&:not(.Mui-disabled):hover': {
            color: mainHexPallete.blue[700],
            WebkitTextFillColor: mainHexPallete.blue[700]
          },
          '&.Mui-focused': {
            color: mainHexPallete.black,
            WebkitTextFillColor: mainHexPallete.black
          },
          '&.Mui-disabled': {
            color: mainHexPallete.blue[700],
            WebkitTextFillColor: mainHexPallete.blue[700]
          },
          '&.Mui-error': {
            color: rgbaTextFieldColors.errorBorderBottom,
            WebkitTextFillColor: rgbaTextFieldColors.errorBorderBottom
          }
        }
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          height: '48px',
          borderRadius: '8px',
          padding: '0 16px',
          color: mainHexPallete.black,
          WebkitTextFillColor: mainHexPallete.black,
          ...textFieldFontStyles,

          '&.MuiOutlinedInput-root': {
            '& fieldset': {
              border: `1px solid ${rgbaTextFieldColors.defaultBorderBottom}`
            },
            '&:hover fieldset': {
              border: `1px solid ${rgbaTextFieldColors.hoveredBorderBottom}`
            },
            '&.Mui-focused fieldset': {
              border: `1px solid ${mainHexPallete.black}`
            },
            '&.Mui-disabled fieldset': {
              border: `1px solid ${mainHexPallete.blue[700]}`
            },
            '&.Mui-error fieldset': {
              border: `1px solid ${rgbaTextFieldColors.errorBorderBottom}`
            }
          },

          '& .MuiOutlinedInput-input.Mui-disabled': {
            color: mainHexPallete.blue[700],
            WebkitTextFillColor: mainHexPallete.blue[700]
          },

          '& .MuiOutlinedInput-input': {
            padding: 0,

            '&:-webkit-autofill': {
              WebkitBoxShadow: 'transparent',
              WebkitTextFillColor: mainHexPallete.black,
              caretColor: mainHexPallete.black,
              transition: 'background-color 5000s ease-in-out 0s'
            }
          }
        }
      }
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          padding: '2px',
          fontFamily: mulish.style.fontFamily,
          position: 'relative',
          overflow: 'hidden',
          width: 'fit-content',
          border: 'none',
          lineHeight: '150%'
        }
      },
      variants: [
        {
          props: { color: 'primary' },
          style: {
            backgroundColor: hexButtonGroupColors.primary.groupBackgroundColor,
            color: hexButtonGroupColors.primary.buttonTextColor
          }
        },
        {
          props: { color: 'secondary' },
          style: {
            backgroundColor: hexButtonGroupColors.secondary.groupBackgroundColor,
            color: hexButtonGroupColors.secondary.buttonTextColor
          }
        },
        {
          props: { color: 'tertiary' },
          style: {
            backgroundColor: hexButtonGroupColors.tertiary.groupBackgroundColor,
            color: hexButtonGroupColors.tertiary.buttonTextColor
          }
        }
      ]
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: '4px',
          borderRadius: '8px',
          boxShadow: `
            0px 4px 8px rgba(0, 0, 0, 0.06),
            0px 0px 4px rgba(0, 0, 0, 0.04)
          `
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: mainHexPallete.white,
          '&.Mui-checked': {
            color: mainHexPallete.yellow[500],
            '& + .MuiSwitch-track': {
              backgroundColor: mainHexPallete.yellow[500]
            },
            '&:hover': {
              backgroundColor: rgbaSwitchColors.hoverCheckedBackground
            },
            '&.Mui-focusVisible': {
              backgroundColor: rgbaSwitchColors.focusCheckedBackground
            }
          },
          '&:hover': {
            backgroundColor: rgbaSwitchColors.hoverBackground
          },
          '&.Mui-focusVisible': {
            backgroundColor: rgbaSwitchColors.focusBackground
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            backgroundColor: rgbaSwitchColors.disabledTrackBackground
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontFamily: mulish.style.fontFamily,
          fontWeight: 500,
          gap: '4px',

          '&.Mui-disabled': {
            color: mainHexPallete.blue[700],
            backgroundColor: 'transparent',
            pointerEvents: 'none'
          },

          '&:hover': {
            backgroundColor: rgbaMenuItemColors.hoverBg
          },
          '&:active': {
            backgroundColor: rgbaMenuItemColors.activeBg
          },
          '&.Mui-selected:hover': {
            backgroundColor: rgbaMenuItemColors.selectedHoverBg
          },
          '&.Mui-selected': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: hexCheckboxColors.iconColor,
          '&.Mui-checked': {
            color: hexCheckboxColors.iconCheckedBg
          },
          '&:hover': {
            backgroundColor: hexCheckboxColors.hoverBg
          },
          '&.Mui-focusVisible': {
            color: hexCheckboxColors.focusVisibleColor,
            backgroundColor: hexCheckboxColors.focusVisibleBg
          },
          '&.Mui-disabled': {
            color: hexCheckboxColors.disabledColor
          }
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          width: '100%',
          maxWidth: '744px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          backgroundColor: accordionColorsRgb.summary.backgroundColor,
          color: accordionColorsRgb.summary.color,
          '&.Mui-expanded': {
            color: accordionColorsRgb.accordion.expanded.color
          },
          '&:before': {
            display: 'none'
          }
        }
      },
      defaultProps: {
        square: true,
        disableGutters: true,
        elevation: 0
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: '60px',
          borderRadius: '24px',
          padding: '16px 16px 16px 24px',
          backgroundColor: accordionColorsRgb.summary.backgroundColor,
          color: accordionColorsRgb.summary.color
        },
        content: {
          margin: 0
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '8px 64px 32px 40px',
          borderRadius: '0 0 24px 24px',
          backgroundColor: accordionColorsRgb.summary.backgroundColor,
          color: accordionColorsRgb.accordion.expanded.color
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '2px 0 0',
          fontSize: '12px',
          '&.Mui-error': {
            color: rgbaTextFieldColors.errorBorderBottom
          }
        }
      }
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '12px',
          fontWeight: 500
        }
      },
      variants: [
        {
          props: { color: 'default', variant: 'standard' },
          style: {
            '& .MuiBadge-badge': {
              backgroundColor: 'transparent',
              color: badgeColors.standardDefaultValue
            }
          }
        },
        {
          props: { color: 'primary', variant: 'standard' },
          style: {
            '& .MuiBadge-badge': {
              backgroundColor: badgeColors.standardPrimaryBg,
              color: badgeColors.standardPrimaryValue
            }
          }
        },
        {
          props: { color: 'primary', variant: 'dot' },
          style: {
            '& .MuiBadge-badge': {
              backgroundColor: badgeColors.dotPrimaryBg
            }
          }
        },
        {
          props: { color: 'secondary', variant: 'standard' },
          style: {
            '& .MuiBadge-badge': {
              backgroundColor: 'transparent',
              color: badgeColors.standardSecondaryValue
            }
          }
        },
        {
          props: { color: 'error', variant: 'standard' },
          style: {
            '& .MuiBadge-badge': {
              backgroundColor: badgeColors.standardErrorBg,
              color: badgeColors.standardErrorValue
            }
          }
        },
        {
          props: { color: 'error', variant: 'dot' },
          style: {
            '& .MuiBadge-badge': {
              backgroundColor: badgeColors.dotErrorBg
            }
          }
        }
      ]
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: fontFamilies.body,
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.3,
          letterSpacing: 0.17,
          color: chipsColors.normalText,
          borderRadius: '20px'
        },

        sizeSmall: {
          height: 'auto',
          padding: '6px 8px',

          '& .MuiChip-label': {
            padding: 0
          },

          '& .MuiChip-icon': {
            margin: 0,
            marginRight: '4px'
          }
        },

        deleteIcon: {
          color: 'inherit',
          '&:hover': {
            color: 'inherit',
            opacity: 0.7
          }
        }
      },
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            backgroundColor: chipsColors.filledDefaultBg,
            border: 'none',

            '&:hover': {
              backgroundColor: chipsColors.filledHoveredBg,
              color: chipsColors.normalText
            },
            '&:active': {
              backgroundColor: chipsColors.filledPressedBg
            },
            '&.Mui-disabled': {
              backgroundColor: chipsColors.filledDisabledBg,
              opacity: 1
            }
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            border: `1px solid ${chipsColors.outlineNormalBorder}`,

            '&:hover': {
              backgroundColor: chipsColors.outlineHoveredBg
            },
            '&:active': {
              backgroundColor: chipsColors.outlinePressedBg
            },
            '&.Mui-disabled': {
              borderColor: chipsColors.outlineDisabledBorder,
              color: chipsColors.outlineDisabledText,
              opacity: 1
            }
          }
        }
      ]
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: toolbarColors.default,
          borderRadius: '4px',
          border: `1px solid ${toolbarColors.border}`,

          '& .MuiToggleButtonGroup-grouped': {
            border: 'none',
            borderRadius: 0,

            '&:not(:first-of-type)': {
              borderLeft: `1px solid ${toolbarColors.border}`
            },

            '&:first-of-type': {
              borderTopLeftRadius: 'inherit',
              borderBottomLeftRadius: 'inherit'
            },
            '&:last-of-type': {
              borderTopRightRadius: 'inherit',
              borderBottomRightRadius: 'inherit'
            }
          }
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: toolbarColors.textColor,

          '&:hover': {
            backgroundColor: toolbarColors.hovered
          },
          '&.Mui-selected': {
            backgroundColor: toolbarColors.focused,
            color: 'inherit',
            '&:hover': {
              backgroundColor: toolbarColors.focused
            }
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: selectorColors.standardTextColor
        }
      },
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            backgroundColor: selectorColors.filledBg,
            borderRadius: '8px',
            '&:before, &:after': { display: 'none' },

            '& .MuiChip-root': {
              backgroundColor: selectorColors.filledChipsBg,
              color: selectorColors.filledChipsContent
            }
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            '& .MuiChip-root': {
              backgroundColor: selectorColors.outlineDefaultChipsBg,
              color: selectorColors.outlineDefaultTextColor,

              '& .MuiChip-deleteIcon': {
                color: selectorColors.outlineDefaultTextColor
              }
            }
          }
        }
      ]
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: '40px',
          borderBottom: `1px solid ${tabsColors.baseUnderline}`
        },
        indicator: {
          backgroundColor: tabsColors.active,
          height: '2px'
        }
      }
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          ...baseTextStyles,
          textTransform: 'none',
          minHeight: '40px',
          padding: '6px 28px 14px',
          fontWeight: 600,
          minWidth: '80px',
          color: tabsColors.unactive,
          '&:hover': {
            color: tabsColors.hovered
          },
          '&:active': {
            color: tabsColors.pressed
          },

          '&.Mui-selected': {
            color: tabsColors.active,
            fontWeight: 600
          },
          '&.Mui-disabled': {
            color: tabsColors.disabled
          }
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          position: 'relative',
          fontSize: '18px',
          fontFamily: fontFamilies.body,
          lineHeight: 1.5,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRadius: '12px',
          boxShadow: `0 1px 3px ${alertColors.shadow}`,
          minWidth: '320px'
        },
        message: {
          padding: 0,
          margin: 0,
          ...baseTextStyles,
          fontWeight: 400
        },
        icon: {
          margin: '2px 8px 0 0',
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          '& svg': {
            width: '26px',
            height: '26px'
          }
        },
        action: {
          padding: 0,
          marginTop: '6px',
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
          flexShrink: 0
        }
      },
      variants: [
        {
          props: { severity: 'error', variant: 'filled' },
          style: {
            backgroundColor: alertColors.filled.errorBg,
            color: alertColors.filled.errorText,
            '& .MuiAlert-icon': {
              color: alertColors.filled.errorIcon
            }
          }
        },
        {
          props: { severity: 'warning', variant: 'filled' },
          style: {
            backgroundColor: alertColors.filled.warningBg,
            color: alertColors.filled.warningText,
            '& .MuiAlert-icon': {
              color: alertColors.filled.warningIcon
            }
          }
        },
        {
          props: { severity: 'info', variant: 'filled' },
          style: {
            backgroundColor: alertColors.filled.infoBg,
            color: alertColors.filled.infoText,
            '& .MuiAlert-icon': {
              color: alertColors.filled.infoIcon
            }
          }
        },
        {
          props: { severity: 'success', variant: 'filled' },
          style: {
            backgroundColor: alertColors.filled.successBg,
            color: alertColors.filled.successText,
            '& .MuiAlert-icon': {
              color: alertColors.filled.successIcon
            }
          }
        },
        {
          props: { severity: 'error', variant: 'outlined' },
          style: {
            backgroundColor: alertColors.outlined.errorBg,
            color: alertColors.outlined.errorText,
            borderColor: alertColors.outlined.errorBorder,
            '& .MuiAlert-icon': {
              color: alertColors.outlined.errorIcon
            }
          }
        },
        {
          props: { severity: 'warning', variant: 'outlined' },
          style: {
            backgroundColor: alertColors.outlined.warningBg,
            color: alertColors.outlined.warningText,
            borderColor: alertColors.outlined.warningBorder,
            '& .MuiAlert-icon': {
              color: alertColors.outlined.warningIcon
            }
          }
        },
        {
          props: { severity: 'info', variant: 'outlined' },
          style: {
            backgroundColor: alertColors.outlined.infoBg,
            color: alertColors.outlined.infoText,
            borderColor: alertColors.outlined.infoBorder,
            '& .MuiAlert-icon': {
              color: alertColors.outlined.infoIcon
            }
          }
        },
        {
          props: { severity: 'success', variant: 'outlined' },
          style: {
            backgroundColor: alertColors.outlined.successBg,
            color: alertColors.outlined.successText,
            borderColor: alertColors.outlined.successBorder,
            '& .MuiAlert-icon': {
              color: alertColors.outlined.successIcon
            }
          }
        }
      ]
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          ...baseTextStyles,
          fontSize: '18px',
          margin: 0,
          marginBottom: '4px'
        }
      }
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'discardChangesModal' },
          style: {
            maxWidth: '630px',
            maxHeight: '280px',
            padding: '40px 64px',
            borderRadius: '32px',
            backgroundColor: mainHexPallete.white,
            overflowY: 'auto',
            outline: 'none'
          }
        }
      ]
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          ...theme.typography.caption,

          backgroundColor: tooltipColors.defaultBg,
          color: tooltipColors.defaultText,
          fontStyle: 'italic',
          textAlign: 'center',
          borderRadius: '20px',
          padding: '4px 16px',
          boxShadow: `0px 4px 4px 0px ${tooltipColors.defaultShadow}`
        }),

        arrow: {
          color: tooltipColors.defaultBg
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          'html:has(&)': {
            scrollbarGutter: 'stable',
            overflow: 'hidden'
          }
        }
      }
    }
  }
});
