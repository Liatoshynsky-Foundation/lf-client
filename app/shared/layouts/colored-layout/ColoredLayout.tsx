import { Box, BoxProps } from '@mui/material';
import React from 'react';

import { styles } from '~/layouts/colored-layout/ColoredLayout.styles';
import MainLayout, { MainLayoutProps } from '~/layouts/main-layout/MainLayout';

export interface ColoredLayoutProps extends BoxProps {
  color?: string;
  mainLayoutProps?: Omit<MainLayoutProps, 'children'>;
}

const ColoredLayout: React.FC<ColoredLayoutProps> = ({
  mainLayoutProps = {},
  color = '#F2EEE8',
  children,
  sx,
  ...props
}) => {
  const { sx: mainLayoutSx, ...otherProps } = mainLayoutProps;

  return (
    <Box sx={[styles.container(color), ...(Array.isArray(sx) ? sx : [sx])]} data-testid="colored-layout" {...props}>
      <MainLayout
        sx={[styles.childrenBox, ...(Array.isArray(mainLayoutSx) ? mainLayoutSx : [mainLayoutSx])]}
        {...otherProps}
      >
        {children}
      </MainLayout>
    </Box>
  );
};

export default ColoredLayout;
