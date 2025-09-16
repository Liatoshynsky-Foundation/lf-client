'use client';

import { Box } from '@mui/material';
import React, { ReactElement } from 'react';

import Button from '~/shared/components/design-system/all-components/button/Button';

export default function Biography(): ReactElement {
  throw new Error('Test error boundary');

  return (
    <Box sx={{ padding: '100px' }}>
      <div>Biography</div>
      <Button
        onClick={() => {
          throw new Error('Test error boundary');
        }}
      >
        Throw Error
      </Button>
    </Box>
  );
}
