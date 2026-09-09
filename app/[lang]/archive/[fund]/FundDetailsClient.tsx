'use client';

import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { Locale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import FundSummaryHeader from '~/components/blocks/fund-summary-header/FundSummaryHeader';
import DocumentTableSection from '~/components/tables/DocumentsTable/DocumentTableSection';

import { getFundSummaryTitle, mapFundCasesToDocuments, mapFundDetailsToSummaryData } from './fundDetails.mapper';
import { ApiRoutes } from '~/constants/routes/api-routes';

import type { FundDetailsDTO } from '~/domain/dto/funds.dto';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { getFullUrl } from '~/lib/utils/getFullUrl';
import { baseService } from '~/services/client/baseService';

type FundDetailsResponse = {
  success: boolean;
  data?: FundDetailsDTO;
};

interface FundDetailsClientProps {
  fundId: number;
  locale: Locale;
  fundSummaryBacklinkUrl: string;
  fundSummaryBacklinkText: string;
}

const loaderSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: { xs: '320px', md: '480px' },
  pt: { xs: '80px', lg: '88px' }
};

export default function FundDetailsClient({
  fundId,
  locale,
  fundSummaryBacklinkUrl,
  fundSummaryBacklinkText
}: Readonly<FundDetailsClientProps>) {
  const router = useRouter();
  const t = useTranslations('common');
  const [fund, setFund] = useState<FundDetailsDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadFundDetails = async () => {
      setIsLoading(true);
      setFund(null);

      try {
        const result = await baseService.request<FundDetailsResponse>({
          method: 'GET',
          url: getFullUrl({
            pathname: ApiRoutes.FUNDS,
            searchParameters: {
              id: fundId,
              lang: locale
            }
          })
        });

        if (!result.success || !result.data) {
          throw new Error('Fund details are missing');
        }

        if (isActive) {
          setFund(result.data);
        }
      } catch {
        if (isActive) {
          router.replace(`/${locale}/404`);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadFundDetails();

    return () => {
      isActive = false;
    };
  }, [fundId, locale, router]);

  const summaryData = useMemo(() => (fund ? mapFundDetailsToSummaryData(fund) : null), [fund]);
  const documents = useMemo(() => (fund ? mapFundCasesToDocuments(fund.cases, locale) : []), [fund, locale]);

  if (isLoading) {
    return (
      <MainLayout>
        <Box sx={loaderSx} data-testid="FundDetailsPage-loader">
          <CircularProgress aria-label={t('loading')} />
        </Box>
      </MainLayout>
    );
  }

  if (!fund || !summaryData) {
    return null;
  }

  return (
    <MainLayout>
      <FundSummaryHeader
        backLinkUrl={fundSummaryBacklinkUrl}
        backLinkText={fundSummaryBacklinkText}
        title={getFundSummaryTitle(fund, locale)}
        data={summaryData}
        sx={{ pt: { xs: '80px', lg: '88px' } }}
      />

      <DocumentTableSection documents={documents} />
    </MainLayout>
  );
}
