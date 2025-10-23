import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import ResearchAndScientificWork from '~/components/research-and-scientific-work/ResearchAndScientificWork';
import { WorkTableSection } from '~/components/tables/WorksTable/WorkTableSelection';

import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';

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

  return (
    <MainLayout>
      {page.blocks.HeroSection && <ResearchAndScientificWork data={page.blocks.HeroSection} />}
      <WorkTableSection lang={lang} />
    </MainLayout>
  );
}
