import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { theme } from '~/ds-components/theme/Theme';

import Footer from '~/shared/components/Footer/Footer';
import Header from '~/shared/components/Header/Header';

interface RootLayoutParams {
  readonly children: ReactNode;
}
export default async function ErrorPageLayout({ children }: RootLayoutParams) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100vw' }}>
      <Box
        sx={{
          padding: '20px 72px',
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap: '40px',
          maxWidth: '1920px ',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          flex: '1',
          [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(8, 1fr)',
            paddingLeft: '56px',
            paddingRight: '56px',
            columnGap: '20px'
          },
          [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            paddingLeft: '24px',
            paddingRight: '24px',
            columnGap: '16px'
          }
        }}
      >
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
