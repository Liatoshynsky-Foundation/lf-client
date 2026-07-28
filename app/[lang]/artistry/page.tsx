import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import MusicTableSection from '~/components/tables/CompositionTable/MusicTableSection';
import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { ArtistryPage } from '~/types/page/pagesBase.type';
import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

import { BlockRenderer } from '~/shared/components/blocks/block-renderer/BlockRenderer';
import { ROUTES } from '~/shared/components/constants/routes';
import PageBuilder from '~/shared/components/page-builder/PageBuilder';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.artistry');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.ARTISTRY,
    locale: lang
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

export default async function Artistry({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <PageBuilder<ArtistryPage>
      lang={lang}
      slug="artistry"
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
