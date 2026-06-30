import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import FoundationFounders from '~/components/blocks/FoundationFounders/FoundationFounders';
import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';
import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import OurGoals from '~/components/blocks/our-goals/OurGoals';
import OurMission from '~/components/blocks/our-mission/OurMission';
import WhatWeDo from '~/components/blocks/what-we-do/WhatWeDo';

import { IAboutUsPage } from '~/types/page/about-us.types';
import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';

import { BlockRenderer } from '~/shared/components/blocks/block-renderer/BlockRenderer';
import { IntroSection } from '~/shared/components/blocks/IntroSection/IntroSection';
import { ROUTES } from '~/shared/components/constants/routes';
import PageBuilder from '~/shared/components/page-builder/PageBuilder';

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
};

const BLOCK_NAMES_MAP: Record<string, keyof RendererProps['blocks']> = {
  intro: 'IntroSection',
  foundation: 'FoundationInfo',
  mission: 'OurMission',
  goals: 'OurGoals',
  office: 'LiatoshynskyOffice',
  'what-we-do': 'WhatWeDo',
  founders: 'FoundationFounders'
};

const BLOCKS_RENDERER: Record<keyof RendererProps['blocks'], (data: RendererProps) => React.JSX.Element> = {
  IntroSection: ({ blocks }) => <IntroSection data={blocks.IntroSection} />,
  FoundationInfo: ({ blocks }) => <FoundationInfo data={blocks.FoundationInfo} />,
  OurMission: ({ blocks }) => <OurMission data={blocks.OurMission} />,
  OurGoals: ({ blocks }) => <OurGoals data={blocks.OurGoals} />,
  LiatoshynskyOffice: ({ blocks }) => <LiatoshynskyOffice data={blocks.LiatoshynskyOffice} />,
  WhatWeDo: ({ blocks }) => <WhatWeDo data={blocks.WhatWeDo} />,
  FoundationFounders: ({ blocks }) => <FoundationFounders data={blocks.FoundationFounders} />
};

export default async function Home({ params }: Readonly<Language>) {
  const { lang } = await params;

  return (
    <PageBuilder<IAboutUsPage['blocks']>
      lang={lang}
      slug="about-us"
      renderBlock={({ blockId, blocks }) => (
        <BlockRenderer
          key={blockId}
          blockId={blockId}
          blocks={blocks}
          rendererMap={BLOCKS_RENDERER}
          namesMap={BLOCK_NAMES_MAP}
        />
      )}
    />
  );
}
