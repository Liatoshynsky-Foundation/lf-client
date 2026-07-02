import { colors } from '@mui/material';

export const mainHexPallete = {
  white: '#FCFCFC', // rgba(252, 252, 252, 1)
  black: '#190d03', // rgba(25, 13, 3, 1)
  blue: {
    50: '#F9FAFB', // rgba(249, 250, 251, 1)
    75: '#F7F8FC', // rgba(247, 248, 252, 1)
    100: '#F0F2FB', // rgba(240, 242, 251, 1)
    200: '#D9DCE8', // rgba(217, 220, 232, 1)
    300: '#C6C8D3', // rgba(198, 200, 211, 1)
    400: '#B2B3BE', // rgba(178, 179, 190, 1)
    500: '#9D9FA9', // rgba(157, 159, 169, 1)
    600: '#898C95', // rgba(137, 140, 149, 1)
    700: '#63666E', // rgba(99, 102, 110, 1)
    800: '#52545A', // rgba(82, 84, 90, 1)
    900: '#3F444A' // rgba(63, 68, 74, 1)
  },
  adminBlue: {
    50: '#F8F8FA',
    100: '#F1F2F7',
    200: '#E6E7ED',
    300: '#DCDDE5',
    400: '#C3C4CE',
    500: '#ADAEBA',
    600: '#989CAB',
    700: '#868A9C',
    800: '#696C7D',
    900: '#4E5061'
  },
  brown: {
    50: '#F7F5F1', // rgba(247, 245, 241, 1)
    100: '#EDE8DF', // rgba(237, 232, 223, 1)
    200: '#D3CAC0', // rgba(211, 202, 192, 1)
    300: '#B8AEA2', // rgba(184, 174, 162, 1)
    400: '#9F9185', // rgba(159, 145, 133, 1)
    500: '#87756B', // rgba(135, 117, 107, 1)
    600: '#6E5A51', // rgba(110, 90, 81, 1)
    700: '#574139', // rgba(87, 65, 57, 1)
    800: '#412B21', // rgba(65, 43, 33, 1)
    900: '#2D1611' // rgba(45, 22, 17, 1)
  },
  yellow: {
    100: '#FFF8E9', // rgba(255, 248, 233, 1)
    200: '#FFEABA', // rgba(255, 234, 186, 1)
    300: '#FFE099', // rgba(255, 224, 153, 1)
    400: '#FFD26A', // rgba(255, 210, 106, 1)
    500: '#FCBD28', // rgba(252, 189, 40, 1)
    600: '#E0A01F', // rgba(224, 160, 31, 1)
    700: '#BF7D13', // rgba(191, 125, 19, 1)
    800: '#8A570C', // rgba(138, 87, 12, 1)
    900: '#673E0F' // rgba(103, 62, 15, 1)
  },
  red: {
    50: '#FCF0ED', // rgba(252, 240, 237, 1)
    100: '#FAE2DC', // rgba(250, 226, 220, 1)
    200: '#F7C3B6', // rgba(247, 195, 182, 1)
    300: '#F4A593', // rgba(244, 165, 147, 1)
    400: '#F7856A', // rgba(247, 133, 106, 1)
    500: '#EB6343', // rgba(235, 99, 67, 1)
    600: '#D13712', // rgba(209, 55, 18, 1)
    700: '#A32B0E', // rgba(163, 43, 14, 1)
    800: '#7F210B', // rgba(127, 33, 11, 1)
    900: '#611908' // rgba(97, 25, 8, 1)
  },
  burgundy: {
    50: '#F9F3F3', // rgba(249, 243, 243, 1)
    100: '#E6D4D3', // rgba(230, 212, 211, 1)
    200: '#D4B8B4', // rgba(212, 184, 180, 1)
    300: '#C19C96', // rgba(193, 156, 150, 1)
    400: '#AE7F79', // rgba(174, 127, 121, 1)
    500: '#9B655E', // rgba(155, 101, 94, 1)
    600: '#874943', // rgba(135, 73, 67, 1)
    700: '#732E28', // rgba(115, 46, 40, 1)
    800: '#600E0F', // rgba(96, 14, 15, 1)
    900: '#3D0607' // rgba(61, 6, 7, 1)
  },
  green: {
    100: '#E2F2DC',
    600: '#579A40',
    800: '#2C4D20'
  },
  charcoalGray: '#232529',
  grey: {
    ...colors.grey,
    150: '#dcdde5', //
    250: '#EAE9E8', // backgroundColors.offWhite rgb(234, 233, 232)
    350: '#D1CFCD', // primaryHoveredBackground rgb(209, 207, 205)
    375: '#D0CECC' // backgroundColorslightGray rgb(208, 206, 204)
  }
};

const sharedTokens = {
  error: 'rgb(230, 60, 20)',
  ripple: 'rgba(239, 233, 224, 0.4)',
  primaryBadge: 'rgba(95, 14, 15, 1)'
};

const sharedButtonDisabled = {
  filledDisabledBg: mainHexPallete.blue[200],
  outlinedDisabledBg: 'transparent',
  outlinedDisabledBorder: mainHexPallete.blue[700],
  disabledText: mainHexPallete.blue[700]
};

const sharedInputErrorBase = {
  errorValue: mainHexPallete.black
};

const standardInputError = {
  ...sharedInputErrorBase,
  errorFirstIcon: sharedTokens.error,
  errorSecondIcon: sharedTokens.error,
  errorUnderline: sharedTokens.error
};

const outlineInputError = {
  ...sharedInputErrorBase,
  errorLabel: sharedTokens.error,
  errorIcon: sharedTokens.error,
  errorOutline: sharedTokens.error,
  errorTextInfo: sharedTokens.error,
  errorTextInfoIcon: sharedTokens.error
};

export const badgeColors = {
  standardDefaultValue: 'rgba(0, 0, 0, 0.56)',
  standardPrimaryValue: mainHexPallete.white,
  standardPrimaryBg: sharedTokens.primaryBadge,
  standardSecondaryValue: mainHexPallete.black,
  standardErrorBg: 'rgba(230, 60, 20, 1)',
  standardErrorValue: mainHexPallete.white,

  dotPrimaryBg: sharedTokens.primaryBadge,
  dotErrorBg: 'rgba(230, 60, 20, 1)'
};

export const buttonColors = {
  primary: {
    ...sharedButtonDisabled,
    filledEnabledBg: mainHexPallete.black,
    filledNormalText: mainHexPallete.white,
    filledHoveredBg: 'rgb(52, 42, 33)',
    filledFocusedBg: 'rgb(93, 85, 78)',
    filledPressedBg: 'rgb(93, 85, 78)',

    outlinedEnabledBg: 'transparent',
    outlinedNormalText: mainHexPallete.black,
    outlinedNormalBorder: mainHexPallete.black,
    outlinedHoveredBg: 'rgba(25, 13, 3, 0.04)',
    outlinedFocusedBg: 'rgba(25, 13, 3, 0.1)',
    outlinedPressedBg: 'rgba(25, 13, 3, 0.1)'
  },

  secondary: {
    ...sharedButtonDisabled,
    filledEnabledBg: mainHexPallete.white,
    filledNormalText: mainHexPallete.black,
    filledHoveredBg: 'rgb(238, 236, 234)',
    filledFocusedBg: 'rgb(211, 205, 198)',
    filledPressedBg: 'rgb(218, 213, 207)',

    outlinedEnabledBg: 'transparent',
    outlinedNormalText: mainHexPallete.white,
    outlinedNormalBorder: mainHexPallete.white,
    outlinedHoveredBg: 'rgba(252, 252, 252, 0.08)',
    outlinedFocusedBg: 'rgba(252, 252, 252, 0.16)',
    outlinedPressedBg: 'rgba(252, 252, 252, 0.16)'
  },

  tertiary: {
    enabledBg: mainHexPallete.yellow[500],
    normalText: mainHexPallete.black,
    hoveredBg: 'rgb(238, 175, 35)',
    focusedBg: 'rgb(229, 169, 34)',
    pressedBg: mainHexPallete.yellow[800],
    disabledBg: mainHexPallete.blue[200],
    disabledText: mainHexPallete.blue[700]
  },

  error: {
    enabledBg: mainHexPallete.red[600],
    normalText: mainHexPallete.white,
    hoveredBg: 'rgb(172, 47, 15)',
    focusedBg: 'rgb(154, 42, 14)',
    pressedBg: 'rgb(154, 42, 13)',
    disabledBg: mainHexPallete.blue[200],
    disabledText: mainHexPallete.blue[700]
  }
};

export const rgbButtonColors = {
  primaryFilledHoveredBackground: 'rgb(52,41,33)',
  primaryOutlinedHoveredBackground: 'rgba(25, 13, 3, 0.08)',
  primaryOutlinedPressedBackground: 'rgba(25, 13, 3, 0.1)',
  primaryHoveredBackground: '#d1cfcd', // rgba(209, 207, 205, 1)
  transparent: 'transparent',
  primaryTextHovered: 'rgb(243,243,242)',
  primaryTextPressed: '#D1CFCD',
  secondaryOutlinedHoveredBackground: 'rgb(52,41,33)',
  secondaryOutlinedPressedBackground: '#5E554E',
  secondaryTextHovered: 'rgb(52,41,33)',
  secondaryTextPressed: '#5E554E'
};

export const buttonGroupColors = {
  primary: {
    selectedButton: mainHexPallete.black,
    selectedButtonText: mainHexPallete.white,
    groupBackground: 'rgba(25, 13, 3, 0.08)',
    buttonText: mainHexPallete.black
  },
  secondary: {
    selectedButton: mainHexPallete.white,
    selectedButtonText: mainHexPallete.black,
    groupBackground: mainHexPallete.black,
    buttonText: mainHexPallete.white
  },
  tertiary: {
    selectedButton: mainHexPallete.white,
    selectedButtonText: mainHexPallete.black,
    groupBackground: mainHexPallete.yellow[500],
    buttonText: mainHexPallete.black
  }
};

export const hexButtonGroupColors = {
  primary: {
    selectedButtonColor: mainHexPallete.black,
    selectedButtonTextColor: mainHexPallete.white,
    groupBackgroundColor: mainHexPallete.blue[50],
    buttonTextColor: mainHexPallete.black
  },
  secondary: {
    selectedButtonColor: mainHexPallete.white,
    selectedButtonTextColor: mainHexPallete.black,
    groupBackgroundColor: mainHexPallete.yellow[500],
    buttonTextColor: mainHexPallete.black
  },
  tertiary: {
    selectedButtonColor: mainHexPallete.white,
    selectedButtonTextColor: mainHexPallete.black,
    groupBackgroundColor: mainHexPallete.brown[200],
    buttonTextColor: mainHexPallete.black
  }
};

export const checkboxColors = {
  defaultIcon: mainHexPallete.blue[500],

  hoveredIcon: mainHexPallete.blue[500],
  hoveredRipple: sharedTokens.ripple,

  focusedIcon: mainHexPallete.brown[300],
  focusedRipple: sharedTokens.ripple,

  disabledIcon: mainHexPallete.blue[200],

  selectedIcon: 'rgba(255, 188, 33, 1)'
};

export const hexCheckboxColors = {
  iconColor: mainHexPallete.blue[500],
  iconCheckedBg: mainHexPallete.yellow[500],
  hoverBg: '#F9F6F3',
  focusVisibleColor: '#E1DAD3',
  focusVisibleBg: '#F9F6F3',
  disabledColor: mainHexPallete.blue[200]
};

export const chipsColors = {
  normalText: mainHexPallete.black,

  filledDefaultBg: mainHexPallete.white,
  filledHoveredBg: mainHexPallete.brown[100],
  filledPressedBg: mainHexPallete.brown[200],
  filledDisabledBg: mainHexPallete.blue[50],

  outlineHoveredBg: 'rgba(25, 13, 3, 0.08)',
  outlinePressedBg: 'rgba(25, 13, 3, 0.24)',
  outlineNormalBorder: mainHexPallete.black,
  outlineDisabledBorder: mainHexPallete.blue[700],
  outlineDisabledText: mainHexPallete.blue[700],

  published: mainHexPallete.green[600],
  draft: mainHexPallete.red[200],
  newsChipBg: 'rgb(182, 208, 247)',
  eventChipBg: 'rgb(247, 182, 225)',
  mediaChipBg: 'rgb(182, 247, 207)'
};

export const menuItemColors = {
  hoveredBg: 'rgba(25, 13, 3, 0.06)',
  activeBg: 'rgba(25, 13, 3, 0.12)',

  defaultText: mainHexPallete.black,
  disabledText: mainHexPallete.blue[700]
};

export const rgbaMenuItemColors = {
  hoverBg: 'rgba(25, 13, 3, 0.06)',
  activeBg: 'rgba(25, 13, 3, 0.12)',
  selectedHoverBg: 'rgba(25, 13, 3, 0.06)'
};

export const selectorColors = {
  standardTextColor: mainHexPallete.black,

  filledBg: mainHexPallete.blue[200],
  filledChipsBg: mainHexPallete.white,
  filledChipsContent: mainHexPallete.black,

  outlineBorder: mainHexPallete.black,
  outlineDefaultChipsBg: mainHexPallete.black,
  outlineDefaultTextColor: mainHexPallete.white
};

export const textFieldColors = {
  standard: {
    ...standardInputError,
    defaultFirstIcon: mainHexPallete.blue[800],
    defaultValue: mainHexPallete.blue[800],
    defaultSecondIcon: mainHexPallete.blue[700],
    defaultUnderline: 'rgba(25, 13, 3, 0.25)',

    hoveredFirstIcon: mainHexPallete.blue[800],
    hoveredValue: mainHexPallete.blue[800],
    hoveredSecondIcon: mainHexPallete.black,
    hoveredUnderline: 'rgba(25, 13, 3, 0.5)',

    focusedFirstIcon: mainHexPallete.black,
    focusedValue: mainHexPallete.black,
    focusedSecondIcon: mainHexPallete.black,
    focusedUnderline: mainHexPallete.black,

    disabledFirstIcon: mainHexPallete.blue[700],
    disabledValue: mainHexPallete.blue[700],
    disabledSecondIcon: mainHexPallete.blue[700],
    disabledUnderline: mainHexPallete.blue[700]
  },

  outline: {
    ...outlineInputError,
    defaultLabel: mainHexPallete.blue[800],
    defaultIcon: mainHexPallete.blue[700],
    defaultValue: mainHexPallete.black,
    defaultOutline: mainHexPallete.adminBlue[500],
    defaultTextInfo: mainHexPallete.blue[800],

    hoveredLabel: mainHexPallete.blue[800],
    hoveredIcon: mainHexPallete.black,
    hoveredValue: mainHexPallete.black,
    hoveredOutline: 'rgba(25, 13, 3, 0.5)',
    hoveredTextInfo: mainHexPallete.blue[800],

    focusedLabel: mainHexPallete.black,
    focusedIcon: mainHexPallete.black,
    focusedValue: mainHexPallete.black,
    focusedOutline: mainHexPallete.black,
    focusedTextInfo: mainHexPallete.black,

    disabledLabel: mainHexPallete.blue[600],
    disabledIcon: mainHexPallete.blue[600],
    disabledValue: mainHexPallete.blue[600],
    disabledOutline: mainHexPallete.blue[600],
    disabledTextInfo: mainHexPallete.blue[600]
  }
};

export const rgbaTextFieldColors = {
  defaultBorderBottom: 'rgba(13, 3, 61, 0.25)',
  hoveredBorderBottom: 'rgba(13, 3, 61, 0.5)',
  errorBorderBottom: '#e63c14'
};

export const tabsColors = {
  active: mainHexPallete.black,
  hovered: mainHexPallete.adminBlue[600],
  pressed: mainHexPallete.adminBlue[900],
  unactive: mainHexPallete.adminBlue[800],
  disabled: mainHexPallete.adminBlue[300],
  baseUnderline: mainHexPallete.adminBlue[300]
};

export const rgbaTabColors = {
  defaultTextColor: 'rgb(152, 156, 171)',
  hoveredTextColor: 'rgb(105, 108, 125)',
  pressedTextColor: 'rgb(78, 80, 97)',
  activeTextColor: 'rgb(25, 13, 3)',
  defaultLineColor: 'rgb(220, 221, 229)',
  pressedLineColor: 'rgb(78, 80, 97)',
  activeLineColor: 'rgb(25, 13, 3)'
};

export const toolbarColors = {
  textColor: mainHexPallete.black,
  default: mainHexPallete.white,
  hovered: 'rgba(241, 242, 247, 1)',
  focused: 'rgba(25, 13, 3, 0.06)',
  border: mainHexPallete.blue[200]
};

export const alertColors = {
  cross: 'rgba(86, 86, 86, 1)',
  shadow: 'rgba(0, 0, 0, 0.08)',

  filled: {
    label: mainHexPallete.white,

    errorBg: mainHexPallete.red[500],
    errorText: mainHexPallete.red[50],
    errorIcon: mainHexPallete.red[700],

    warningBg: mainHexPallete.yellow[500],
    warningText: mainHexPallete.white,
    warningIcon: mainHexPallete.white,

    infoBg: 'rgba(51, 161, 216, 1)',
    infoText: mainHexPallete.white,
    infoIcon: 'rgba(86, 86, 86, 1)',

    successBg: mainHexPallete.green[600],
    successText: mainHexPallete.white,
    successIcon: mainHexPallete.blue[700]
  },

  outlined: {
    label: mainHexPallete.black,

    errorBg: mainHexPallete.red[50],
    errorText: mainHexPallete.red[800],
    errorIcon: mainHexPallete.blue[700],
    errorBorder: mainHexPallete.red[500],

    warningBg: mainHexPallete.yellow[100],
    warningText: mainHexPallete.yellow[800],
    warningIcon: 'rgba(181, 133, 23, 1)',
    warningBorder: mainHexPallete.yellow[500],

    infoBg: 'rgba(214, 236, 247, 1)',
    infoText: 'rgba(20, 64, 86, 1)',
    infoIcon: 'rgba(86, 86, 86, 1)',
    infoBorder: 'rgba(51, 161, 216, 1)',

    successBg: mainHexPallete.green[100],
    successText: mainHexPallete.green[800],
    successIcon: mainHexPallete.blue[700],
    successBorder: mainHexPallete.green[600]
  }
};

export const accordionColors = {
  defaultBg: mainHexPallete.white,
  defaultBorder: mainHexPallete.blue[200],
  defaultIcon: mainHexPallete.black
};

export const accordionColorsRgb = {
  summary: {
    backgroundColor: 'rgba(237, 232, 223, 1)',
    color: mainHexPallete.black,
    expanded: {
      backgroundColor: 'rgba(247, 245, 241, 1)'
    }
  },
  accordion: {
    expanded: {
      backgroundColor: 'rgba(247, 245, 241, 1)',
      color: mainHexPallete.brown[800]
    }
  }
};

export const tooltipColors = {
  defaultBg: mainHexPallete.blue[900],
  defaultText: mainHexPallete.white,
  defaultShadow: 'rgba(0, 0, 0, 0.07)'
};

export const shadowColors = {
  popup: 'rgb(78, 80, 97)'
};

export const rgbaSwitchColors = {
  hoverCheckedBackground: '#fcbd280a',
  focusCheckedBackground: '#fcbd284d',
  hoverBackground: '#190d030a',
  focusBackground: '#190d0314',
  disabledTrackBackground: '#190d031f'
};
