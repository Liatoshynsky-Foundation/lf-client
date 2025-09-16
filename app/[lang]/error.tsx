'use client'; // Error boundaries must be Client Components

import { Box } from '@mui/material';
import { useEffect } from 'react';

import ErrorComponent from '~/shared/components/error-component/Error';

interface ErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box sx={{ gridColumn: '1 / -1', overflow: 'visible' }}>
      <ErrorComponent />
    </Box>
  );
}
