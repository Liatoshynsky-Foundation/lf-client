import { colors } from '@mui/material';

export const mainHexPallete = {
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
  grey: {
    ...colors.grey,
    150: '#dcdde5', //
    250: '#EAE9E8', // backgroundColors.offWhite rgb(234, 233, 232)
    350: '#D1CFCD', // primaryHoveredBackground rgb(209, 207, 205)
    375: '#D0CECC' // backgroundColorslightGray rgb(208, 206, 204)
  },
  black: '#190d03', // rgba(25, 13, 3, 1)
  white: '#FCFCFC' // rgba(252, 252, 252, 1)
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

export const rgbaTextFieldColors = {
  defaultBorderBottom: 'rgba(13, 3, 61, 0.25)',
  hoveredBorderBottom: 'rgba(13, 3, 61, 0.5)',
  errorBorderBottom: '#e63c14'
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

export const rgbaSwitchColors = {
  hoverCheckedBackground: '#fcbd280a',
  focusCheckedBackground: '#fcbd284d',
  hoverBackground: '#190d030a',
  focusBackground: '#190d0314',
  disabledTrackBackground: '#190d031f'
};

export const rgbaMenuItemColors = {
  hoverBg: 'rgba(25, 13, 3, 0.06)',
  activeBg: 'rgba(25, 13, 3, 0.12)',
  selectedHoverBg: 'rgba(25, 13, 3, 0.06)'
};

export const hexCheckboxColors = {
  iconColor: mainHexPallete.blue[500],
  iconCheckedBg: mainHexPallete.yellow[500],
  hoverBg: '#F9F6F3',
  focusVisibleColor: '#E1DAD3',
  focusVisibleBg: '#F9F6F3',
  disabledColor: mainHexPallete.blue[200]
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

export const rgbaTabColors = {
  defaultTextColor: 'rgb(152, 156, 171)',
  hoveredTextColor: 'rgb(105, 108, 125)',
  pressedTextColor: 'rgb(78, 80, 97)',
  activeTextColor: 'rgb(25, 13, 3)',
  defaultLineColor: 'rgb(220, 221, 229)',
  pressedLineColor: 'rgb(78, 80, 97)',
  activeLineColor: 'rgb(25, 13, 3)'
};
