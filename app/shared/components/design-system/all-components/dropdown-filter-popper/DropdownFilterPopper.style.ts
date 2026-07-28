import { SxProps } from '@mui/material';

export const styles = {
  root: (variant: 'filled' | 'outlined', disabled: boolean): SxProps => {
    let backgroundColor = 'blue.200';
    if (disabled) {
      backgroundColor = 'blue.75';
    } else if (variant === 'outlined') {
      backgroundColor = 'transparent';
    }

    let borderColor: string | undefined;
    if (variant === 'outlined') {
      borderColor = disabled ? 'blue.200' : 'black';
    }

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '40px',
      gap: '8px',
      borderRadius: '8px',
      padding: '6px 8px 6px 16px',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'background-color 0.2s',
      typography: 'customSemiBold16',
      textTransform: 'none',
      outline: 0,
      backgroundColor,
      border: variant === 'outlined' ? '1px solid' : 'none',
      borderColor,
      '&.Mui-disabled': {
        cursor: 'default'
      },
      '&:focus-visible': {
        outline: '2px solid'
      }
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
  dropdownIcon: (disabled: boolean, open: boolean): SxProps => ({
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease-in-out',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
  }),

  popoverContent: (minWidth?: number): SxProps => ({
    minWidth,
    padding: '8px 0',
    outline: 0
  })
};
