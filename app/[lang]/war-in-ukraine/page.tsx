import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import VolunteerDonation from '~/components/blocks/volunteer-donation/VolunteerDonation';
import WarInfoSection from '~/components/blocks/war-info/WarInfoSection';

import { WarInUkrainePage } from '~/types/page/pagesBase.type';
import type { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';

import { BlockRenderer } from '~/shared/components/blocks/block-renderer/BlockRenderer';
import ImageCarouselSection from '~/shared/components/blocks/image-carousel-section/ImageCarouselSection';
import PrincipleOfHope from '~/shared/components/blocks/principle-of-hope/PrincipleOfHope';
import YermolenkoLinks from '~/shared/components/blocks/yermolenko-links/YermolenkoLinks';
import { ROUTES } from '~/shared/components/constants/routes';
import PageBuilder from '~/shared/components/page-builder/PageBuilder';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.warInUkraine');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: ROUTES.WAR_IN_UKRAINE,
    locale: lang
  });
}

type RendererProps = {
  blocks: WarInUkrainePage['blocks'];
};

const BLOCK_NAMES_MAP: Record<string, keyof RendererProps['blocks']> = {
  'war-info': 'WarInfo',
  'principle-of-hope': 'PrincipleOfHope',
  'war-carousel': 'WarCarousel',
  'yermolenko-links': 'YermolenkoLinks',
  'volunteer-donation': 'VolunteerDonation'
};

const BLOCKS_RENDERER: Record<keyof RendererProps['blocks'], (data: RendererProps) => React.JSX.Element> = {
  WarInfo: ({ blocks }) => <WarInfoSection data={blocks.WarInfo} />,
  PrincipleOfHope: ({ blocks }) => <PrincipleOfHope data={blocks.PrincipleOfHope} />,
  WarCarousel: ({ blocks }) => <ImageCarouselSection data={blocks.WarCarousel} />,
  YermolenkoLinks: ({ blocks }) => <YermolenkoLinks data={blocks.YermolenkoLinks} />,
  VolunteerDonation: ({ blocks }) => <VolunteerDonation data={blocks.VolunteerDonation} />
};

export default async function WarInUkraine({ params }: Readonly<Language>) {
  const { lang } = await params;

  return (
    <PageBuilder<WarInUkrainePage>
      lang={lang}
      slug="war-in-ukraine"
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
