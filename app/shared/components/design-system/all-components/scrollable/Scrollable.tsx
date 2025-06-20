'use client';

import { Box, BoxProps, styled } from '@mui/material';
import React from 'react';

import { mainHexPallete } from '../theme/colors';

const NativeScrollableContent = styled(Box)({
  width: 'min-content',
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

interface ScrollableProps extends BoxProps {
  children: React.ReactNode;
}

const Scrollable = ({ children, sx, ...props }: ScrollableProps) => {
  return (
    <NativeScrollableContent sx={sx} {...props}>
      {children}
    </NativeScrollableContent>
  );
};

export default Scrollable;
