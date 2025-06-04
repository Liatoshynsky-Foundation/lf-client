export const menuItemStyles = {
  fontSize: '16px',
  fontFamily: 'Mulish, sans-serif',
  fontWeight: 500,
  gap: '4px',

  '&.Mui-disabled': {
    color: '#63666e',
    backgroundColor: 'transparent',
    pointerEvents: 'none'
  },

  '&:hover': {
    backgroundColor: '#190d030f'
  },
  '&:active': {
    backgroundColor: '#190d031f'
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#190d030f'
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent'
  }
};
