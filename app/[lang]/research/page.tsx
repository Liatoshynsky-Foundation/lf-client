import { Box } from '@mui/material';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import ResearchAndScientificWork from '~/components/research-and-scientific-work/ResearchAndScientificWork';
import { WorkTableSection } from '~/components/tables/WorksTable/WorkTableSelection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import MainLayout from '~/layouts/main-layout/MainLayout';

export const metadata = createSeoMeta({
  title: 'Дослідження та наукові роботи - Фундація Лятошинського',
  description: 'Ознайомтесь з дослідженнями та науковими роботами Бориса Лятошинського.',
  url: '/research'
});

export default async function ResearchPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const pageService = await createRequestContainer().resolve('pagesDataService');

  const page = await pageService.getPageData('research', lang);

  if (!page) {
    return <Box />;
  }

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout>
      {page.blocks.HeroSection && <ResearchAndScientificWork data={page.blocks.HeroSection} />}
      <WorkTableSection />
    </MainLayout>
  );
}
