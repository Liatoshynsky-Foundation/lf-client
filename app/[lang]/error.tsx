'use client';

import { Box } from '@mui/material';
import { useEffect } from 'react';

import ErrorComponent from '~/shared/components/error-component/Error';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function ErrorFallback({ error }: Readonly<ErrorProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box sx={{ gridColumn: '1 / -1', overflow: 'visible' }}>
      <ErrorComponent />
    </Box>
  );
}
