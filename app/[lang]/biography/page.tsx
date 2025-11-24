import React, { ReactElement } from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { HeroSection } from '~/shared/components/blocks/HeroSection/HeroSection';

export default function Biography(): ReactElement {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <HeroSection />
    </MainLayout>
  );
}
