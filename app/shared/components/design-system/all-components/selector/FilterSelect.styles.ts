import { SxProps } from '@mui/material';

export const filterSelectStyles = {
  root: (variant: 'filled' | 'outlined', disabled: boolean): SxProps => {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '40px',
      gap: '8px',
      borderRadius: '8px',
      padding: '6px 8px 6px 16px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s',

      typography: 'customSemiBold16',

      backgroundColor: disabled ? 'blue.75' : variant === 'outlined' ? 'transparent' : 'blue.200',

      border: variant === 'outlined' ? '1px solid' : 'none',
      borderColor: variant === 'outlined' ? (disabled ? 'blue.200' : 'black') : undefined
    };
  },

  label: (disabled: boolean): SxProps => ({
    typography: 'customSemiBold16',
    color: disabled ? 'blue.700' : 'black'
  }),

  chipContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  chipList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    flex: 1
  },

  placeholderChip: {
    pointerEvents: 'none',
    opacity: 0.7,
    flex: 1
  },

  dropdownIcon: (disabled: boolean): SxProps => ({
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'flex',
    justifyContent: 'center'
  }),

  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    typography: 'customSemiBold16'
  },

  clearAllContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  }
};
