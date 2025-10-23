import { Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import MainLayout from '~/layouts/main-layout/MainLayout';

export default function MediaAboutUs(): ReactElement {
  return (
    <MainLayout withLines>
      <Typography variant="h1">Media about us</Typography>
    </MainLayout>
  );
}
