import { alpha, SxProps, Theme } from '@mui/material/styles';

export const baseChipStyles = (variant: 'filled' | 'outlined'): SxProps<Theme> => {
  const isOutlined = variant === 'outlined';

  return (theme: Theme) => ({
    height: 28,
    maxWidth: 115,
    fontSize: '16px',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: '100%',
    letterSpacing: '0%',
    padding: '0 8px',
    color: 'black',
    backgroundColor: isOutlined ? 'transparent' : 'white',
    border: isOutlined ? '1px solid' : 'none',
    borderColor: isOutlined ? 'black' : 'none',

    alignItems: 'center',
    justifyContent: 'space-between',

    '&:hover': {
      backgroundColor: isOutlined ? alpha(theme.palette.primary.main, 0.24) : 'blue.50'
    },
    '&:active': {
      backgroundColor: isOutlined ? alpha(theme.palette.primary.main, 0.24) : 'blue.100'
    },
    '&.Mui-disabled': {
      backgroundColor: isOutlined ? 'transparent' : 'blue.50',
      color: 'blue.700',
      border: isOutlined ? '1px solid' : 'none',
      borderColor: isOutlined ? 'blue.700' : 'none'
    },
    '.MuiChip-deleteIcon': {
      width: 16,
      height: 16,
      cursor: 'pointer',
      opacity: 1,
      '&:hover': {
        opacity: 0.8
      },
      '&:active': {
        opacity: 0.6
      },
      '.Mui-disabled &': {
        opacity: 0.5,
        cursor: 'default'
      }
    }
  });
};
