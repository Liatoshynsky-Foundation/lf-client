import { Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

export default function MediaAboutUs(): ReactElement {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <Typography variant="h1">Media about us</Typography>
    </MainLayout>
  );
}
