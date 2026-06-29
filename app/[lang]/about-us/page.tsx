import type { Metadata } from 'next';
import type { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import FoundationFounders from '~/components/blocks/FoundationFounders/FoundationFounders';
import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';
import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import OurGoals from '~/components/blocks/our-goals/OurGoals';
import OurMission from '~/components/blocks/our-mission/OurMission';
import WhatWeDo from '~/components/blocks/what-we-do/WhatWeDo';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import { IAboutUsPage } from '~/types/page/about-us.types';
import { Language } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { IntroSection } from '~/shared/components/blocks/IntroSection/IntroSection';
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

type RendererProps = {
  blocks: IAboutUsPage['blocks'];
  t: ReturnType<typeof useTranslations>;
};

const BLOCKS_RENDERER: Record<keyof RendererProps['blocks'], (data: RendererProps) => React.JSX.Element> = {
  IntroSection: ({ blocks }) => <IntroSection data={blocks.IntroSection} />,
  FoundationInfo: ({ blocks }) => <FoundationInfo data={blocks.FoundationInfo} />,
  OurMission: ({ blocks }) => <OurMission data={blocks.OurMission} />,
  OurGoals: ({ blocks }) => <OurGoals data={blocks.OurGoals} />,
  LiatoshynskyOffice: ({ blocks, t }) => <LiatoshynskyOffice data={blocks.LiatoshynskyOffice} t={t} />,
  WhatWeDo: ({ blocks }) => <WhatWeDo data={blocks.WhatWeDo} />,
  FoundationFounders: ({ blocks }) => <FoundationFounders data={blocks.FoundationFounders} />
};

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
          const id = blockId as keyof IAboutUsPage['blocks'];

          const Component = BLOCKS_RENDERER[id];

          if (!Component) return null;

          return <Component key={blockId} blocks={blocks} t={t} />;
        })}
    </MainLayout>
  );
}
