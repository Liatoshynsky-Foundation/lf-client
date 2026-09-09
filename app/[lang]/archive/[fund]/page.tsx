import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import {
  fundSummaryBacklinkText,
  getFundSummaryHeaderBacklinkUrl
} from '~/components/blocks/fund-summary-header/FundSummaryHeader.content';

import FundDetailsClient from './FundDetailsClient';

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

  if (!Number.isInteger(fundId) || fundId < 1) {
    return notFound();
  }

  setRequestLocale(locale);

  const fundSummaryBacklinkUrl = await getFundSummaryHeaderBacklinkUrl();

  return (
    <FundDetailsClient
      fundId={fundId}
      locale={locale}
      fundSummaryBacklinkUrl={fundSummaryBacklinkUrl}
      fundSummaryBacklinkText={fundSummaryBacklinkText[locale]}
    />
  );
}
