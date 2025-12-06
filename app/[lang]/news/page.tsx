import { Typography } from '@mui/material';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

const News = () => {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout>
      <Typography variant="h1">News</Typography>
    </MainLayout>
  );
};

export default News;
