import type { Metadata } from 'next';
import React from 'react';

import FoundationFounders from '~/components/blocks/FoundationFounders/FoundationFounders';
import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';
import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import OurGoals from '~/components/blocks/our-goals/OurGoals';
import OurMission from '~/components/blocks/our-mission/OurMission';
import WhatWeDo from '~/components/blocks/what-we-do/WhatWeDo';

import { AboutUsPage } from '~/types/page/pagesBase.type';
import { LocalizedPageProps } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';

import { getDraftId } from '~/lib/utils/getDraftId';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { BlockRenderer } from '~/shared/components/blocks/block-renderer/BlockRenderer';
import { IntroSection } from '~/shared/components/blocks/IntroSection/IntroSection';
import { ROUTES } from '~/shared/components/constants/routes';
import PageBuilder from '~/shared/components/page-builder/PageBuilder';

export async function generateMetadata({ params, searchParams }: LocalizedPageProps): Promise<Metadata> {
  return getPageMetadata(params, {
    pageTranslationKey: 'meta.pages.aboutUs',
    pageRoute: ROUTES.HOME,
    fetchPageMetaData: async () => {
      const { lang } = await params;
      const query = await searchParams;
      const pageResult = await resolvePageData('about-us', lang, getDraftId(query));

      if (isError(pageResult)) return null;
      return UnwrapResult(pageResult);
    }
  });
}

type RendererProps = {
  blocks: AboutUsPage['blocks'];
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

export default async function Home({ params, searchParams }: Readonly<LocalizedPageProps>) {
  const { lang } = await params;

  return (
    <PageBuilder<AboutUsPage>
      lang={lang}
      slug="about-us"
      pathname={`/${lang}/${ROUTES.ABOUT_US}`}
      searchParams={searchParams}
      renderBlock={({ blockId, blocks, uniqueRenderKey }) => (
        <BlockRenderer
          key={uniqueRenderKey}
          blockId={blockId}
          blocks={blocks}
          rendererMap={BLOCKS_RENDERER}
          namesMap={BLOCK_NAMES_MAP}
        />
      )}
    />
  );
}
