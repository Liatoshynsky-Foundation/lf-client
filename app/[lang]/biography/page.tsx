import React, { ReactElement } from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { BiographyContent } from './BiographyContent/BiographyContent';
import { biographyContentData } from './data/Biography.consts';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { HeroSection } from '~/shared/components/blocks/HeroSection/HeroSection';
import { biographyHeroData } from '~/shared/components/blocks/HeroSection/HeroSection.content';

export default function Biography(): ReactElement {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const years = biographyContentData.map((year) => year.yearTitle).filter((year) => year !== undefined);

  return (
    <MainLayout withLines>
      <HeroSection data={biographyHeroData} years={years} />
      <BiographyContent data={biographyContentData} />
    </MainLayout>
  );
}
