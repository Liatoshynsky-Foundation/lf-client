import { backgroundColors, mainHexPallete } from '~/ds-components/theme/colors';

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
    maxHeight: '40px',
    minWidth: '615px',
    backgroundColor: backgroundColors.offWhite
  },
  buttonGroupBackground: {
    backgroundColor: backgroundColors.white,
    padding: '6px',
    borderRadius: '999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  warInUkraineButton: {
    backgroundColor: mainHexPallete.blue[900],
    color: mainHexPallete.white,
    '&:hover': {
      backgroundColor: mainHexPallete.black
    }
  }
};
