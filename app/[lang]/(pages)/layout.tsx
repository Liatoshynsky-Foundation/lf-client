import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { ColumnGuides } from '~/shared/components/column-guides/ColumnGuides';

interface LayoutProps {
  readonly children: ReactNode;
}

export default function PagesLayout({ children }: LayoutProps) {
  return (
    <>
      <ColumnGuides />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1' }}>{children}</Box>
    </>
  );
}
