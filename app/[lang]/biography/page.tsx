import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React, { ReactElement } from 'react';

import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import { BiographyContent } from './BiographyContent/BiographyContent';
import { Language } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { HeroSection } from '~/shared/components/blocks/HeroSection/HeroSection';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.biography');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.BIOGRAPHY,
    locale: lang
  });
}

export default async function Biography({ params }: Readonly<Language>): Promise<ReactElement> {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const pageResult = await resolvePageData('biography', lang);

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
  }

  const blocks = page.blocks;

  const years = blocks.biographyContent.map((year) => year.yearTitle).filter((year) => year !== null);

  return (
    <MainLayout withLines>
      {blocks.heroSection && <HeroSection data={blocks.heroSection} years={years} />}
      {blocks.biographyContent && <BiographyContent data={blocks.biographyContent} />}
      <div id="timeline-hide-sentinel" style={{ height: '1px' }} />
      {blocks.LiatoshynskyOffice && <LiatoshynskyOffice data={blocks.LiatoshynskyOffice} sx={{ mb: '80px' }} />}
    </MainLayout>
  );
}
