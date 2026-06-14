import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'left' && prop !== 'width' && prop !== 'palette' && prop !== 'animate'
})<{
  left: number;
  width: number;
  palette: 'primary' | 'secondary' | 'tertiary';
  animate?: boolean;
}>(({ left, width, palette, animate = true }) => {
  const isPrimary = palette === 'primary';

  return {
    height: 'calc(100% - 8px)',
    top: 4,
    position: 'absolute',
    borderRadius: '9999px',
    transition: animate ? 'all 0.3s ease' : 'none',
    zIndex: 0,
    backgroundColor: isPrimary ? 'black' : 'white',
    color: isPrimary ? 'white' : 'black',
    left,
    width
  };
});

export const StyledButtonItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'palette' && prop !== 'size'
})<{
  active: boolean;
  palette: 'primary' | 'secondary' | 'tertiary';
  size: 'small' | 'big';
}>(({ active, palette, size }) => {
  const isPrimary = palette === 'primary';
  const activeTextColor = isPrimary ? 'white' : 'black';
  const inactiveTextColor = 'black';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: '9999px',
    color: active ? activeTextColor : inactiveTextColor,
    fontFamily: 'inherit',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
    marginRight: '4px',
    padding: size === 'big' ? '5px 16px' : '2px 16px',
    '&:has(svg)': {
      paddingRight: '12px'
    },
    '& svg': {
      transform: 'translateY(2px)'
    },
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
    '& .MuiButtonBase-root, && a, && button': {
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
      display: 'inline-flex',
      height: '100%',
      transition: 'none'
    }
  };
});
