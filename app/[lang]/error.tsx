'use client';

import { Box } from '@mui/material';

import ErrorComponent from '~/shared/components/error-component/Error';

export default function ErrorFallback() {
  return (
    <Box sx={{ gridColumn: '1 / -1', overflow: 'visible' }}>
      <ErrorComponent />
    </Box>
  );
}
