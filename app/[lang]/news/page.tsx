import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import MediaIntroSection from './MediaIntroSection/MediaIntroSection';
import { Language } from '~/types/types/language';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import MediaCenter from '~/shared/components/blocks/media-center/MediaCenter';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.news');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: '/news',
    locale: lang
  });
}

const News = async ({ params }: Readonly<Language>) => {
  const { lang } = await params;
  setRequestLocale(lang);
  const locale = await getLocale();

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const container = createRequestContainer();
  const newsService = container.resolve('newsService');
  const mediaMentionService = container.resolve('mediaMentionService');

  const newsData = await newsService.getAllPublishedNews(locale);
  const mediaMentionsData = await mediaMentionService.getAllPublishedMediaMentions();

  return (
    <MainLayout withLines>
      <MediaIntroSection />
      <MediaCenter newsData={newsData} mediaMentionsData={mediaMentionsData} />
    </MainLayout>
  );
};

export default News;
