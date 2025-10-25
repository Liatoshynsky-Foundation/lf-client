import { Box, BoxProps } from '@mui/material';

import { ColumnGuides } from '~/components/column-guides/ColumnGuides';

import { styles } from '~/layouts/main-layout/MainLayout.styles';

export interface MainLayoutProps extends BoxProps {
  readonly withLines?: boolean;
  readonly lineColor?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ withLines = false, lineColor, children, sx, ...props }) => {
  return (
    <Box sx={[styles, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {withLines && <ColumnGuides lineColor={lineColor} />}
      {children}
    </Box>
  );
};

export default MainLayout;
