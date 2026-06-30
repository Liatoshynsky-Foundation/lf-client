import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '../under-development/UnderDevelopment';
import { IAboutUsPage } from '~/types/page/about-us.types';
import { PrivacyPolicyPage } from '~/types/page/pagesBase.type';
import { isError, UnwrapResult } from '~/types/types/result';

import { PageNotFound } from '~/[lang]/[...unknown-route]/page-not-found/PageNotFound';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { isProductionMode } from '~/lib/utils/isProductionMode';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import MainLayout from '~/shared/layouts/main-layout/MainLayout';

export type PossibleBlocks = IAboutUsPage['blocks'] | PrivacyPolicyPage['blocks'];
export interface PageBuilderProps<TBlocks extends PossibleBlocks> {
  lang: 'en' | 'uk';
  slug: 'about-us' | 'privacy-policy';
  renderBlock: ({ blockId, blocks }: { blockId: string; blocks: TBlocks; title?: string }) => React.JSX.Element | null;
}

export default async function PageBuilder<TBlocks extends PossibleBlocks>({
  lang,
  slug,
  renderBlock
}: Readonly<PageBuilderProps<TBlocks>>) {
  setRequestLocale(lang);
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const pageResult = await resolvePageData(slug, lang);

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
  }

  const blocks = page.blocks as TBlocks;
  const blocksOrder = page.blocksOrder;

  return (
    <MainLayout withLines>
      {blocksOrder &&
        blocksOrder.length > 0 &&
        blocksOrder.map((blockId) => renderBlock({ blockId, blocks, title: page.title }))}
    </MainLayout>
  );
}
