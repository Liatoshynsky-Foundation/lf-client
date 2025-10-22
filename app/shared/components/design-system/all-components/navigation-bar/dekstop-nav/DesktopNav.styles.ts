import { backgroundColors } from '~/ds-components/theme/colors';

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
    minWidth: '553px',
    backgroundColor: backgroundColors.offWhite
  },
  buttonGroupBackground: {
    border: `6px solid ${backgroundColors.white}`,
    borderRadius: '999px'
  }
};
