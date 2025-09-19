import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { layoutStyles } from '../layout.styles';

import Footer from '~/shared/components/Footer/Footer';
import Header from '~/shared/components/Header/Header';

interface LayoutProps {
  readonly children: ReactNode;
}

export default async function ErrorPageLayout({ children }: LayoutProps) {
  return (
    <Box sx={layoutStyles.container}>
      <Box sx={layoutStyles.grid}>
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Header />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1' }}>{children}</Box>
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
