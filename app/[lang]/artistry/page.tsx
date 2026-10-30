import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import MusicTableSection from '~/components/tables/CompositionTable/MusicTableSection';
import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { ArtistryPage } from '~/types/page/pagesBase.type';
import { LocalizedPageProps } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';
import { isProductionMode } from '~/utils/isProductionMode';

import { getDraftId } from '~/lib/utils/getDraftId';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { BlockRenderer } from '~/shared/components/blocks/block-renderer/BlockRenderer';
import { ROUTES } from '~/shared/components/constants/routes';
import PageBuilder from '~/shared/components/page-builder/PageBuilder';

export async function generateMetadata({ params, searchParams }: LocalizedPageProps): Promise<Metadata> {
  return getPageMetadata(params, {
    pageTranslationKey: 'meta.pages.artistry',
    pageRoute: ROUTES.ARTISTRY,
    fetchPageMetaData: async () => {
      const { lang } = await params;
      const query = await searchParams;
      const pageResult = await resolvePageData('artistry', lang, getDraftId(query));

      if (isError(pageResult)) return null;
      return UnwrapResult(pageResult);
    }
  });
}

type RendererProps = {
  blocks: ArtistryPage['blocks'];
};

const BLOCK_NAMES_MAP: Record<string, keyof RendererProps['blocks']> = {
  'title-with-quote': 'TitleWithQuote',
  'music-table': 'MusicTableSection'
};

const BLOCKS_RENDERER: Record<keyof RendererProps['blocks'], (data: RendererProps) => React.JSX.Element> = {
  TitleWithQuote: ({ blocks }) => <TitleWithQuote data={blocks.TitleWithQuote} />,
  MusicTableSection: () => <MusicTableSection />
};

export default async function Artistry({ params, searchParams }: Readonly<LocalizedPageProps>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <PageBuilder<ArtistryPage>
      lang={lang}
      slug="artistry"
      pathname={`/${lang}/${ROUTES.ARTISTRY}`}
      searchParams={searchParams}
      renderBlock={({ blockId, blocks, uniqueRenderKey }) => {
        return (
          <BlockRenderer
            key={uniqueRenderKey}
            blockId={blockId}
            blocks={blocks}
            rendererMap={BLOCKS_RENDERER}
            namesMap={BLOCK_NAMES_MAP}
          />
        );
      }}
    />
  );
}
