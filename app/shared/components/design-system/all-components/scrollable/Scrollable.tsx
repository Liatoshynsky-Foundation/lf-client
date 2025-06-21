'use client';
import { BoxProps } from '@mui/material';
import React from 'react';

import { NativeScrollableContent } from './Scrollable.style';

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
