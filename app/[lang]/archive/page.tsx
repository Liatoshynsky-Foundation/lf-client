'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import ArchiveHeader from './ArchiveHeader/ArchiveHeader';
import FundCard from './FundCard/FundCard';

import { FundDTO } from '~/domain/dto/funds.dto';
import newFundsRepository from '~/infrastructure/repositories/funds/funds.repository.mock';
import MainLayout from '~/layouts/main-layout/MainLayout';

const styles = {
  pageWrapper: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    rowGap: 0,
    alignItems: 'start',
    gridAutoRows: 'min-content',
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    paddingTop: {
      xs: '80px',
      sm: '89px',
      md: '89px',
      lg: '95px',
      xl: '97px'
    }
  },
  fundsGrid: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '32px',
      lg: '40px'
    },
    paddingBottom: {
      xs: '80px',
      sm: '96px',
      md: '80px',
      lg: '96px'
    }
  }
};

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isBigTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const [error, setError] = useState<string | null>(null);

  const [funds, setFunds] = useState<FundDTO[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const data = await newFundsRepository().getFunds();
        setFunds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadFunds();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredFunds = funds.filter((fund) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return fund.number.toLowerCase().includes(query) || fund.title.toLowerCase().includes(query);
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getNumColumns = () => {
    if (isMobile) return 1;
    if (isSmallTablet) return 2;
    if (isBigTablet) return 3;
    return 4;
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout withLines={!isMobile}>
      <Box sx={styles.pageWrapper} data-testid="ArchivePage">
        <ArchiveHeader onSearch={handleSearch} />

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
              {(fundsByColumn[columnNum] || []).map((fund) => (
                <FundCard key={fund.id} id={fund.id} number={fund.number} title={fund.title} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
}
