import { Box, styled } from '@mui/material';

import { mainHexPallete } from '../theme/colors';

export const NativeScrollableContent = styled(Box)({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '12px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: mainHexPallete.blue[400],
    borderRadius: '16px',
    border: '3px solid transparent',
    backgroundClip: 'content-box',
    '&:hover': {
      backgroundColor: mainHexPallete.black
    }
  }
});
