import { Typography } from '@mui/material';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

export const metadata = createSeoMeta({
  title: 'Liatoshynsky Foundation during War in Ukraine',
  description: '',
  url: '/war-in-ukraine'
});

export default function WarInUkraine() {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <Typography variant="h1" sx={{ gridColumn: '1 / -1', textAlign: 'center' }}>
        War in Ukraine
      </Typography>
    </MainLayout>
  );
}
