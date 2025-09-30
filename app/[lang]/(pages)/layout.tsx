import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

import { ColumnGuides } from '~/components/column-guides/ColumnGuides';

interface LayoutProps {
  readonly children: ReactNode;
}

const sx: SxProps<Theme> = {
  width: '100%',
  maxWidth: '1728px',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(4, 1fr)',
    sm: 'repeat(8, 1fr)',
    md: 'repeat(12, 1fr)'
  },
  columnGap: {
    xs: '16px',
    sm: '24px',
    md: '40px'
  },
  m: '0 auto',
  pt: {
    xs: '70px',
    sm: '82px',
    md: '100px',
    lg: '92px'
  },
  px: {
    xs: '24px',
    sm: '56px',
    md: '72px'
  }
};

export default function PagesLayout({ children }: LayoutProps) {
  return (
    <Box sx={sx}>
      <ColumnGuides />
      {children}
    </Box>
  );
}
