import { Box, BoxProps } from '@mui/material';

import { ColumnGuides } from '~/components/column-guides/ColumnGuides';

import { styles } from '~/layouts/main-layout/MainLayout.styles';

export interface MainLayoutProps extends BoxProps {
  readonly withLines?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ withLines = false, children, sx, ...props }) => {
  return (
    <Box sx={[styles, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {withLines && <ColumnGuides />}
      {children}
    </Box>
  );
};

export default MainLayout;
