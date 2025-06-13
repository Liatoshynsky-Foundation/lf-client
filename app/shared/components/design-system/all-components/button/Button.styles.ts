import { SxProps, Theme } from '@mui/material';

import { rgbButtonColors } from '~/ds-components/theme/colors';

export const typographyStyles = {
  primary: {
    small: {
      fontFamily: 'Mulish',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '140%'
    },
    medium: {
      fontFamily: 'Mulish',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '150%'
    },
    large: {
      fontFamily: 'Mulish',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '155%'
    }
  },
  secondary: {
    small: {
      fontFamily: 'Mulish',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '140%'
    },
    medium: {
      fontFamily: 'Mulish',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%'
    },
    large: {
      fontFamily: 'Mulish',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '155%'
    }
  },
  tertiary: {
    small: {
      fontFamily: 'Mulish',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '140%'
    },
    medium: {
      fontFamily: 'Mulish',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%'
    },
    large: {
      fontFamily: 'Mulish',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '155%'
    }
  }
};

export const buttonBaseStyles: SxProps<Theme> = {
  borderRadius: '28px',
  textTransform: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px'
};

export const sizeStyles = {
  small: {
    padding: '4px 12px',
    height: '32px',
    gap: '4px'
  },
  medium: {
    padding: '8px 24px',
    height: '40px'
  },
  large: {
    padding: '14px 32px',
    height: '56px'
  }
};

export const variantStyles = {
  primary: {
    filled: {
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
    },
    outlined: {
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
    },
    text: {
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

  secondary: {
    filled: {
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
    },
    outlined: {
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
    },
    text: {
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

  tertiary: {
    filled: {
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
  }
};
