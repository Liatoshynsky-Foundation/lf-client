'use client';

import { Box, CircularProgress } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import ArchiveHeader from './ArchiveHeader/ArchiveHeader';
import FundCard from './FundCard/FundCard';
import { styles } from './page.styles';

import { FundDTO } from '~/domain/dto/funds.dto';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { useTableFilters } from '~/shared/hooks/use-table-filters/useTableFilters';

const getColumnPaddingTop = (columnNum: number) => {
  const paddingMap = {
    sm: columnNum === 1 ? '40px' : '0px',
    md: (() => {
      if (columnNum === 1) return '80px';
      if (columnNum === 2) return '40px';
      return '0px';
    })(),
    lg: (() => {
      if (columnNum === 1) return '120px';
      if (columnNum === 2) return '80px';
      if (columnNum === 3) return '40px';
      return '0px';
    })()
  };

  return {
    xs: '0px',
    ...paddingMap
  };
};

export default function Archive() {
  const t = useTranslations('common');
  const { isMobile, isTablet, isLaptop, isDesktop } = useBreakpoints();
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  const [funds, setFunds] = useState<FundDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { params, setParam } = useTableFilters({ search: '' });

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const response = await fetch(`/api/funds?lang=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch funds');
        }

        const result = await response.json();
        setFunds(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadFunds();
  }, [locale]);

  if (error) {
    throw new Error(error);
  }

  const filteredFunds = funds.filter((fund) => {
    if (!params.search) return true;
    const query = params.search.toLowerCase();
    return fund.number[locale].toLowerCase().includes(query) || fund.title[locale].toLowerCase().includes(query);
  });

  const getNumColumns = () => {
    switch (true) {
      case isMobile:
        return 1;
      case isTablet:
        return 2;
      case isLaptop:
        return 3;
      case isDesktop:
        return 4;
      default:
        return 4;
    }
  };

  const numColumns = getNumColumns();

  const fundsByColumn: Record<number, FundDTO[]> = {};
  for (let i = 1; i <= numColumns; i++) {
    fundsByColumn[i] = [];
  }

  filteredFunds.forEach((fund, index) => {
    const columnIndex = (index % numColumns) + 1;
    if (fundsByColumn[columnIndex]) {
      fundsByColumn[columnIndex].push(fund);
    }
  });

  return (
    <MainLayout withLines={!isMobile}>
      <Box sx={styles.pageWrapper} data-testid="ArchivePage">
        <ArchiveHeader onSearch={(value) => setParam('search', value)} />

        {isLoading ? (
          <Box sx={styles.loaderBox} data-testid="ArchivePage-loader">
            <CircularProgress aria-label={t('loading')} />
          </Box>
        ) : (
          <Box sx={styles.fundsGrid} data-testid="ArchivePage-fundsGrid">
            {Array.from({ length: numColumns }, (_, i) => i + 1).map((columnNum) => (
              <Box
                key={`column-${columnNum}`}
                sx={{
                  display: 'grid',
                  gridAutoRows: 'min-content',
                  rowGap: '16px',
                  paddingTop: getColumnPaddingTop(columnNum)
                }}
              >
                {fundsByColumn[columnNum].map((fund) => (
                  <FundCard key={fund.id} id={fund.id} number={fund.number} title={fund.title} />
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </MainLayout>
  );
}
