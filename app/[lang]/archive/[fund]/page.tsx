'use client';

import { Box, Typography } from '@mui/material';

import MainLayout from '~/layouts/main-layout/MainLayout';

export default function FundDetailsPage() {
  return (
    <MainLayout>
      <Box>
        <Box>
          <Typography variant="h4">Fund details</Typography>
        </Box>
      </Box>
    </MainLayout>
  );
}
