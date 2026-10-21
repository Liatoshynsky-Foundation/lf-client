import type { Metadata } from 'next';
import { getLocale, setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import MediaIntroSection from './MediaIntroSection/MediaIntroSection';
import { Language } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import MediaCenter from '~/shared/components/blocks/media-center/MediaCenter';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  return getPageMetadata(params, {
    pageTranslationKey: 'meta.pages.news',
    pageRoute: ROUTES.NEWS,
    fetchPageMetaData: async () => {
      const { lang } = await params;
      const pageResult = await resolvePageData('publications', lang);

      if (isError(pageResult)) return null;
      return UnwrapResult(pageResult);
    }
  });
}

const News = async ({ params }: Readonly<Language>) => {
  const { lang } = await params;
  setRequestLocale(lang);
  const locale = await getLocale();

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const pageResult = await resolvePageData('publications', lang);

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
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
      {page.blocks.PublicationsIntro && <MediaIntroSection data={page.blocks.PublicationsIntro} />}
      <MediaCenter eventsData={eventsData} newsData={newsData} mediaMentionsData={mediaMentionsData} />
    </MainLayout>
  );
};

export default News;
