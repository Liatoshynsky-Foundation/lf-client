import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '../under-development/UnderDevelopment';
import { AboutUsPage, ArtistryPage, PrivacyPolicyPage, WarInUkrainePage } from '~/types/page/pagesBase.type';
import { isError, UnwrapResult } from '~/types/types/result';

import { PageNotFound } from '~/[lang]/[...unknown-route]/page-not-found/PageNotFound';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { isProductionMode } from '~/lib/utils/isProductionMode';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import MainLayout from '~/shared/layouts/main-layout/MainLayout';

export type PossiblePages = AboutUsPage | PrivacyPolicyPage | ArtistryPage | WarInUkrainePage;

export interface PageBuilderProps<TPages extends PossiblePages> {
  lang: 'en' | 'uk';
  slug: TPages['slug'];
  renderBlock: ({
    blockId,
    blocks,
    uniqueRenderKey
  }: {
    blockId: string;
    blocks: TPages['blocks'];
    title?: string;
    uniqueRenderKey: string;
  }) => React.JSX.Element | null;
}
type ValidSlug = 'about-us' | 'privacy-policy' | 'artistry' | 'war-in-ukraine';

const isValidSlug = (slug: string): slug is ValidSlug => {
  if (!['about-us', 'privacy-policy', 'artistry', 'war-in-ukraine'].includes(slug)) {
    return false;
  }
  return true;
};

export default async function PageBuilder<TPages extends PossiblePages>({
  lang,
  slug,
  renderBlock
}: Readonly<PageBuilderProps<TPages>>) {
  setRequestLocale(lang);
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  if (!isValidSlug(slug)) return null;

  const pageResult = await resolvePageData(slug, lang);

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
        blocksOrder.map((blockId, index) =>
          renderBlock({ blockId, blocks, title: page.title, uniqueRenderKey: `${blockId}-${index}` })
        )}
    </MainLayout>
  );
}
