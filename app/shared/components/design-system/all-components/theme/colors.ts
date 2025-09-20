export const mainHexPallete = {
  blue: {
    50: '#F9FAFB',
    75: '#F7F8FC',
    100: '#F0F2FB',
    200: '#D9DCE8',
    300: '#C6C8D3',
    400: '#B2B3BE',
    500: '#9D9FA9',
    600: '#898C95',
    700: '#63666E',
    800: '#52545A',
    900: '#3F444A'
  },
  red: {
    50: '#FCF0ED',
    100: '#FAE2DC',
    200: '#F7C3B6',
    300: '#F4A593',
    400: '#F7856A',
    500: '#EB6343',
    600: '#D13712',
    700: '#A32B0E',
    800: '#7F210B',
    900: '#611908'
  },
  yellow: {
    100: '#FFF8E9',
    200: '#FFEABA',
    300: '#FFE099',
    400: '#FFD26A',
    500: '#FCBD28',
    600: '#E0A01F',
    700: '#BF7D13',
    800: '#8A570C',
    900: '#673E0F'
  },
  brown: {
    50: '#F7F5F1',
    100: '#EDE8DF',
    200: '#D3CAC0',
    300: '#B8AEA2',
    400: '#9F9185',
    500: '#87756B',
    600: '#6E5A51',
    700: '#574139',
    800: '#412B21',
    900: '#2D1611'
  },
  burgundy: {
    50: '#F9F3F3',
    100: '#E6D4D3',
    200: '#D4B8B4',
    300: '#C19C96',
    400: '#AE7F79',
    500: '#9B655E',
    600: '#874943',
    700: '#732E28',
    800: '#600E0F',
    900: '#3D0607'
  },
  black: '#190d03',
  white: '#FCFCFC'
};

export const backgroundColors = {
  white: '#FFFFFF',
  offWhite: '#EAE9E8',
  lightGray: '#D0CECC'
};

export const rgbButtonColors = {
  primaryFilledHoveredBackground: 'rgb(52,41,33)',
  primaryOutlinedHoveredBackground: 'rgba(25, 13, 3, 0.08)',
  primaryOutlinedPressedBackground: 'rgba(25, 13, 3, 0.1)',
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
  errorBorderBottom: 'rgba(230, 60, 20, 1)'
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

export const rgbaClearFilterButton = {
  defaultTextColor: 'rgba(230, 60, 20, 1)'
};
