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
import { isError, UnwrapResult } from '~/types/types/result';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.aboutUs');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.HOME,
    locale: lang
  });
}

const BLOCKS_MAP: Record<string, ({ data }: any) => React.JSX.Element> = {
  IntroSection,
  FoundationInfo,
  OurMission,
  OurGoals,
  LiatoshynskyOffice,
  WhatWeDo,
  FoundationFounders
};

const getBlockComponentById = (blockId: string) => BLOCKS_MAP[blockId];

export default async function Home({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const [pageResult, t] = await Promise.all([
    resolvePageData('about-us', lang),
    getTranslations('home.liatoshynskyOffice')
  ]);

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
  }

  const blocks = page.blocks;
  const blocksOrder = page.blocksOrder;

  return (
    <MainLayout withLines>
      {blocksOrder &&
        blocksOrder.length > 0 &&
        blocksOrder.map((blockId) => {
          const Component = getBlockComponentById(blockId);
          const blockData = blocks[blockId];
          if (!Component || !blockData) return null;

          if (blockId === 'LiatoshynskyOffice') {
            return <Component key={blockId} data={blockData} t={t} />;
          }

          return <Component key={blockId} data={blockData} />;
        })}
    </MainLayout>
  );
}
