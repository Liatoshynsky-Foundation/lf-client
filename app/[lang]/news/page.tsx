import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import MediaIntroSection from './MediaIntroSection/MediaIntroSection';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import MediaCenter from '~/shared/components/blocks/media-center/MediaCenter';

const News = () => {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <MediaIntroSection />
      <MediaCenter />
    </MainLayout>
  );
};

export default News;
