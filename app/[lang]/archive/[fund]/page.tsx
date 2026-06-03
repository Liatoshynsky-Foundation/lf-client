import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import React from 'react';

import FundSummaryHeader from '~/components/blocks/fund-summary-header/FundSummaryHeader';
import {
  fundSummaryBacklinkText,
  fundSummaryContent,
  fundSummaryTitle,
  getFundSummaryHeaderBacklinkUrl
} from '~/components/blocks/fund-summary-header/FundSummaryHeader.content';
import DocumentTableSection from '~/components/tables/DocumentsTable/DocumentTableSection';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { mockDocuments } from '~/shared/components/tables/DocumentsTable/documents.mock';

interface FundDetailsPageProps {
  params: Promise<{
    lang: string;
    fund: string;
  }>;
}

export default async function FundDetailsPage({ params }: Readonly<FundDetailsPageProps>) {
  const { lang, fund } = await params;
  const locale = lang as Locale;

  const fundId = Number(fund);

  if (Number.isNaN(fundId)) {
    return notFound();
  }

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const fundSummaryBacklinkUrl = await getFundSummaryHeaderBacklinkUrl();

  return (
    <MainLayout>
      <FundSummaryHeader
        backLinkUrl={fundSummaryBacklinkUrl}
        backLinkText={fundSummaryBacklinkText[locale]}
        title={fundSummaryTitle[locale]}
        data={fundSummaryContent}
        sx={{ pt: { xs: '80px', lg: '88px' } }}
      />

      <DocumentTableSection documents={mockDocuments} />
    </MainLayout>
  );
}
