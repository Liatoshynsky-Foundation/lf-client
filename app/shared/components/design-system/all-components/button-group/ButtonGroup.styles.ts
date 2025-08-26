import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { hexButtonGroupColors } from '~/ds-components/theme/colors';

export const StyledIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'left' && prop !== 'width' && prop !== 'palette'
})<{
  left: number;
  width: number;
  palette: 'primary' | 'secondary';
}>(({ left, width, palette }) => {
  const paletteValues = palette === 'primary' ? hexButtonGroupColors.primary : hexButtonGroupColors.secondary;

  return {
    height: 'calc(100% - 4px)',
    top: 2,
    position: 'absolute',
    borderRadius: '9999px',
    transition: 'all 0.3s ease',
    zIndex: 0,
    backgroundColor: paletteValues.selectedButtonColor,
    color: paletteValues.selectedButtonTextColor,
    left,
    width
  };
});

export const StyledButtonItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'palette' && prop !== 'size'
})<{
  active: boolean;
  palette: 'primary' | 'secondary';
  size: 'small' | 'big';
}>(({ active, palette, size }) => {
  const paletteValues = palette === 'primary' ? hexButtonGroupColors.primary : hexButtonGroupColors.secondary;

  return {
    display: 'inline-block',
    borderRadius: '9999px',
    color: active ? paletteValues.selectedButtonTextColor : paletteValues.buttonTextColor,
    fontFamily: 'inherit',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
    marginRight: '4px',
    padding: size === 'big' ? '5px 16px' : '2px 16px',
    textTransform: 'none',
    lineHeight: '150%',
    border: 'none',
    backgroundColor: 'transparent',
    '&:last-child': {
      marginRight: 0
    },
    '&:hover': {
      background: 'rgba(25, 13, 3, 0.12)'
    },
    '& button': {
      backgroundColor: 'transparent',
      color: 'inherit',
      textDecoration: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
      cursor: 'inherit',
      border: 'none',
      padding: 0,
      margin: 0,
      display: 'inline-block',
      height: '100%',
      transition: 'none'
    }
  };
});
