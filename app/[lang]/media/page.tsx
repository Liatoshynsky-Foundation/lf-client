import { Typography } from '@mui/material';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

const Media = () => {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout>
      <Typography variant="h1">Media</Typography>
    </MainLayout>
  );
};

export default Media;
