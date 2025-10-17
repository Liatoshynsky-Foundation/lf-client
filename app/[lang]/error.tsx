'use client';

import { Box } from '@mui/material';
import ErrorComponent from '~/shared/components/error-component/Error';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function ErrorFallback({ error }: Readonly<ErrorProps>) {
  return (
    <Box sx={{ gridColumn: '1 / -1', overflow: 'visible' }}>
      <ErrorComponent />
    </Box>
  );
}
