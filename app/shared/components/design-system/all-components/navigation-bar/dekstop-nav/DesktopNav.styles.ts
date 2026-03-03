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
    marginTop: '8px',
    marginLeft: '-16px'
  },
  buttonGroup: {
    height: '40px',
    backgroundColor: backgroundColors.offWhite,
    p: '4px'
  },
  buttonGroupBackground: {
    backgroundColor: backgroundColors.white,
    borderRadius: '999px',
    border: `6px solid ${backgroundColors.white}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  warInUkraineWrapper: {
    backgroundColor: backgroundColors.offWhite,
    borderRadius: '999px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px'
  },
  warInUkraineButton: {
    backgroundColor: 'transparent',
    verticalAlign: 'middle',
    fontWeight: 'normal',
    color: hexButtonGroupColors.primary.buttonTextColor,
    lineHeight: '140%',
    letterSpacing: 0,
    padding: '0 16px',
    height: '32px',

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
