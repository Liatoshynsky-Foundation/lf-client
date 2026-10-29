import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import ResearchAndScientificWork from '~/components/research-and-scientific-work/ResearchAndScientificWork';
import { WorkTableSection } from '~/components/tables/WorksTable/WorkTableSection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import { LocalizedPageProps } from '~/types/types/language';
import { isError, isErrorCode, UnwrapResult } from '~/types/types/result';
import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { getDraftId } from '~/lib/utils/getDraftId';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { redirectToDisablePreview } from '~/lib/utils/redirectToDisablePreview';
import { PAGES_DATA_ERROR_CODES } from '~/services/pages-data/pagesDataErrorCodes';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params, searchParams }: LocalizedPageProps): Promise<Metadata> {
  return getPageMetadata(params, {
    pageTranslationKey: 'meta.pages.research',
    pageRoute: ROUTES.RESEARCH,
    fetchPageMetaData: async () => {
      const { lang } = await params;
      const query = await searchParams;
      const pageResult = await resolvePageData('research', lang, getDraftId(query));

      if (isError(pageResult)) return null;
      return UnwrapResult(pageResult);
    }
  });
}

export default async function ResearchPage({ params, searchParams }: Readonly<LocalizedPageProps>) {
  const { lang } = await params;
  const query = await searchParams;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const pageResult = await resolvePageData('research', lang, getDraftId(query));

  if (isErrorCode(pageResult, PAGES_DATA_ERROR_CODES.DRAFT_NOT_FOUND)) {
    redirectToDisablePreview(`/${lang}/${ROUTES.RESEARCH}`, query);
  }

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
  }

  const blocks = page.blocks;

  return (
    <MainLayout>
      {blocks.HeroSection && <ResearchAndScientificWork data={blocks.HeroSection} />}
      <WorkTableSection />
    </MainLayout>
  );
}
