import { mainHexPallete } from '../theme/colors';

export const styles = {
  menuItem: {
    minWidth: '153px',
    gap: '4px',
    minHeight: '36px',
    fontFamily: 'Mulish, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    color: '#190D03',
    lineHeight: '150%',
    '&.Mui-selected': {
      backgroundColor: 'transparent'
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'rgba(25, 13, 3, 0.1)'
    },
    '&:hover': {
      backgroundColor: 'rgba(25, 13, 3, 0.1)'
    }
  },
  dropdownMenu: {
    minHeight: '88px',
    padding: '8px 0'
  },
  item: (isActive: boolean) => ({
    fontFamily: 'Mulish, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '145%',
    color: isActive ? mainHexPallete.black : 'rgba(65, 43, 33, 0.6)'
  }),
  mobileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  }
};
