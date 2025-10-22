import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

import { styles } from '~/layouts/colored-layout/ColoredLayout.styles';
import MainLayout, { MainLayoutProps } from '~/layouts/main-layout/MainLayout';

export interface ColoredLayoutProps extends MainLayoutProps {
  color?: string;
  wrapperSx?: SxProps<Theme>;
}

const ColoredLayout: React.FC<ColoredLayoutProps> = ({ color = '#F2EEE8', wrapperSx = {}, children, sx, ...props }) => {
  return (
    <Box
      sx={[styles.container(color), ...(Array.isArray(wrapperSx) ? wrapperSx : [wrapperSx])]}
      data-testid="colored-layout"
    >
      <MainLayout sx={[styles.childrenBox, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
        {children}
      </MainLayout>
    </Box>
  );
};

export default ColoredLayout;
