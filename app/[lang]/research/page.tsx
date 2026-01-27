import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import ResearchAndScientificWork from '~/components/research-and-scientific-work/ResearchAndScientificWork';
import { WorkTableSection } from '~/components/tables/WorksTable/WorkTableSection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { resolvePageData } from '~/services/pages-data/resolvePageData';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.research');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: '/research',
    locale: lang
  });
}

export default async function ResearchPage({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const page = await resolvePageData('research', lang);

  if (!page) {
    return <PageNotFound />;
  }

  const blocks = page.blocks;

  return (
    <MainLayout>
      {blocks.HeroSection && <ResearchAndScientificWork data={blocks.HeroSection} />}
      <WorkTableSection />
    </MainLayout>
  );
}
