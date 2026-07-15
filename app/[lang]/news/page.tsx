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
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.news');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.NEWS,
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
  const eventService = container.resolve('eventService');
  const newsService = container.resolve('newsService');
  const mediaMentionService = container.resolve('mediaMentionService');

  const newsData = await newsService.getAllPublishedNews(locale);
  const eventsData = await eventService.getAllPublishedEvents(locale);
  const mediaMentionsData = await mediaMentionService.getAllPublishedMediaMentions(lang as 'uk' | 'en');

  return (
    <MainLayout>
      <MediaIntroSection />
      <MediaCenter eventsData={eventsData} newsData={newsData} mediaMentionsData={mediaMentionsData} />
    </MainLayout>
  );
};

export default News;
