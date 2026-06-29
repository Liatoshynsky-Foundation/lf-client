import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import UnderDevelopment from '../under-development/UnderDevelopment';
import { isError, UnwrapResult } from '~/types/types/result';

import { PageNotFound } from '~/[lang]/[...unknown-route]/page-not-found/PageNotFound';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { isProductionMode } from '~/lib/utils/isProductionMode';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import MainLayout from '~/shared/layouts/main-layout/MainLayout';

interface PageBuilder<TBlocks> {
  lang: 'en' | 'uk';
  slug: 'about-us' | 'privacy-policy';
  renderBlock: ({
    blockId,
    blocks
  }: {
    blockId: keyof TBlocks;
    blocks: TBlocks;
    title?: string;
  }) => React.JSX.Element | null;
}

export default async function PageBuilder<TBlocks>({ lang, slug, renderBlock }: Readonly<PageBuilder<TBlocks>>) {
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
        blocksOrder.map((blockId) => renderBlock({ blockId: blockId as keyof TBlocks, blocks }))}
    </MainLayout>
  );
}
