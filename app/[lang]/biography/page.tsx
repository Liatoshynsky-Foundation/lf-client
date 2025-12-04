import React, { ReactElement } from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { BiographyContent } from './BiographyContent/BiographyContent';
import { biographyContentData } from './data/BiographyContent.consts';
import { isProductionMode } from '~/utils/isProductionMode';

import { biographyHeroData } from '~/[lang]/biography/data/HeroSection.consts';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { HeroSection } from '~/shared/components/blocks/HeroSection/HeroSection';

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
