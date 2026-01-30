import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { NewsSection } from '~/components/blocks/news-section/NewsSection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages');

  return createSeoMeta({
    title: t('news.title') || 'News',
    description: t('news.description') || 'Latest news and updates from the Liatoshynsky Foundation',
    url: '/news',
    locale: lang
  });
}

const News = async ({ params }: Readonly<Language>) => {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <NewsSection locale={lang} />
    </MainLayout>
  );
};

export default News;
