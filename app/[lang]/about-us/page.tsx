import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import FoundationFounders from '~/components/blocks/FoundationFounders/FoundationFounders';
import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';
import { IntroSection } from '~/components/blocks/IntroSection/IntroSection';
import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import OurGoals from '~/components/blocks/our-goals/OurGoals';
import OurMission from '~/components/blocks/our-mission/OurMission';
import WhatWeDo from '~/components/blocks/what-we-do/WhatWeDo';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.aboutUs');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: '/',
    locale: lang
  });
}

import { resolvePageData } from '~/services/pages-data/resolvePageData';

export default async function Home({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const [page, t] = await Promise.all([resolvePageData('about-us', lang), getTranslations('home.liatoshynskyOffice')]);

  if (!page) {
    return <PageNotFound />;
  }

  const blocks = page.blocks;

  return (
    <MainLayout withLines>
      {blocks.IntroSection && <IntroSection data={blocks.IntroSection} />}
      {blocks.FoundationInfo && <FoundationInfo data={blocks.FoundationInfo} />}
      {blocks.OurMission && <OurMission data={blocks.OurMission} />}
      {blocks.OurGoals && <OurGoals data={blocks.OurGoals} />}
      {blocks.LiatoshynskyOffice && <LiatoshynskyOffice data={blocks.LiatoshynskyOffice} t={t} />}
      {blocks.WhatWeDo && <WhatWeDo data={blocks.WhatWeDo} />}
      {blocks.FoundationFounders && <FoundationFounders data={blocks.FoundationFounders} />}
    </MainLayout>
  );
}
