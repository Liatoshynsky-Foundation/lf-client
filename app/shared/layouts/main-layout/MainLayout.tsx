import { Box, type BoxProps, SxProps, Theme } from '@mui/material';

import { ColumnGuides } from '~/components/column-guides/ColumnGuides';

import { styles } from '~/layouts/main-layout/MainLayout.styles';
import { sxToArray } from '~/lib/utils/sxToArray';

export interface MainLayoutProps extends BoxProps {
  readonly withLines?: boolean;
  readonly lineColor?: string;
  readonly gridSx?: SxProps<Theme>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ withLines = false, lineColor, children, sx, gridSx, ...props }) => {
  return (
    <Box sx={[styles.wrapper, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {withLines && <ColumnGuides lineColor={lineColor} />}

      <Box component="main" id="main" tabIndex={-1} sx={[styles.grid, ...sxToArray(gridSx)]}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
