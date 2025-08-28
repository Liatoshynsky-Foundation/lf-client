import { mainHexPallete } from '../../theme/colors';

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
    backgroundColor: 'rgba(25, 13, 3, 0.06)'
  },
  buttonGroupBackground: {
    border: `7px solid ${mainHexPallete.white}`,
    borderRadius: '999px'
  }
};
