import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from '~/layouts/colored-layout/ColoredLayout.styles';
import MainLayout, { MainLayoutProps } from '~/layouts/main-layout/MainLayout';

export interface ColoredLayoutProps extends MainLayoutProps {
  color?: string;
  wrapperSx?: SxProps<Theme>;
}

const ColoredLayout: React.FC<ColoredLayoutProps> = ({ color = '#F2EEE8', wrapperSx = {}, children, ...props }) => {
  const DEFAULT_LINE_COLOR = mainHexPallete.white;

  return (
    <Box
      sx={[styles.container(color), ...(Array.isArray(wrapperSx) ? wrapperSx : [wrapperSx])]}
      data-testid="colored-layout"
    >
      <MainLayout lineColor={DEFAULT_LINE_COLOR} {...props}>
        {children}
      </MainLayout>
    </Box>
  );
};

export default ColoredLayout;
