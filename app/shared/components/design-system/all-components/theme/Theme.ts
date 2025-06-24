import { createTheme, PaletteColorOptions } from '@mui/material';
import { Mulish, Oswald } from 'next/font/google';

import {
  accordionColorsRgb,
  hexButtonGroupColors,
  hexCheckboxColors,
  mainHexPallete,
  rgbaMenuItemColors,
  rgbaSwitchColors,
  rgbaTextFieldColors,
  rgbButtonColors
} from '~/ds-components/theme/colors';

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
              backgroundColor: mainHexPallete.black,
              color: mainHexPallete.white
            },
            '&:focus-visible': {
              backgroundColor: mainHexPallete.black,
              color: mainHexPallete.white
            },
            '&:active': {
              backgroundColor: mainHexPallete.black,
              color: mainHexPallete.white
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
          width: '385px',
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
          width: '280px',
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
          maxWidth: '742px',
          marginTop: '16px',
          marginLeft: '16px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          backgroundColor: accordionColorsRgb.summary.backgroundColor,
          color: accordionColorsRgb.summary.color,
          '&.Mui-expanded': {
            backgroundColor: accordionColorsRgb.accordion.expanded.backgroundColor,
            color: accordionColorsRgb.accordion.expanded.color
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
          color: accordionColorsRgb.summary.color,
          '&.Mui-expanded': {
            backgroundColor: accordionColorsRgb.summary.expanded.backgroundColor
          }
        },
        content: {
          margin: 0
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '16px 16px 16px 24px',
          borderRadius: '0 0 24px 24px',
          backgroundColor: accordionColorsRgb.accordion.expanded.backgroundColor,
          color: accordionColorsRgb.accordion.expanded.color
        }
      }
    }
  }
});
