import { backgroundColors, hexButtonGroupColors, mainHexPallete, rgbButtonColors } from '~/ds-components/theme/colors';

export const styles = {
  iconButtonSx: {
    background: 'none',
    boxShadow: 'none',
    ':hover, :focus, :active': {
      background: 'none',
      boxShadow: 'none'
    }
  },
  menuItem: {
    maxWidth: '212px',
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },
  iconButtonInline: {
    display: 'flex',
    alignItems: 'center'
  },
  dropdownMenu: {
    marginTop: '8px'
  },
  buttonGroup: {
    height: '40px',
    backgroundColor: backgroundColors.offWhite,
    p: '4px'
  },
  buttonGroupBackground: {
    backgroundColor: backgroundColors.white,
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  warInUkraineButton: {
    backgroundColor: backgroundColors.offWhite,
    verticalAlign: 'middle',
    fontWeight: 'normal',
    marginTop: '-0.2px',
    color: hexButtonGroupColors.primary.buttonTextColor,
    padding: '0 16px',
    lineHeight: '140%',
    letterSpacing: 0,
    '&:hover': {
      backgroundColor: rgbButtonColors.primaryHoveredBackground
    },
    '&:focus': {
      backgroundColor: mainHexPallete.black,
      color: mainHexPallete.white
    }
  },

  warInUkraineButtonActive: {
    backgroundColor: mainHexPallete.black,
    color: mainHexPallete.white,
    '&:hover': {
      backgroundColor: mainHexPallete.black
    }
  }
};
