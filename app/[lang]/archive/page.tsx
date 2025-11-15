'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

import ArchiveHeader from './ArchiveHeader/ArchiveHeader';
import FundCard from './FundCard/FundCard';

import MainLayout from '~/layouts/main-layout/MainLayout';

const FUNDS_DATA = [
  { id: 1, number: 'Фонд 1', title: 'АУДІОЗАПИСИ', column: 1 },
  { id: 2, number: 'Фонд 2', title: 'ОСОБИСТІ ДОКУМЕНТИ', column: 2 },
  { id: 3, number: 'Фонд 3', title: 'ЛИСТИ', column: 3 },
  { id: 4, number: 'Фонд 4', title: 'АФІШІ', column: 4 },
  { id: 5, number: 'Фонд 5', title: 'НОТНІ РУКОПИСИ', column: 1 },
  { id: 6, number: 'Фонд 6', title: 'ТЕКСТИ', column: 2 },
  { id: 7, number: 'Фонд 7', title: 'ДОГОВОРИ НА ВИДАННЯ ТВОРІВ, ЛИСТУВАННЯ З ВИДАВНИЦТВАМИ', column: 3 },
  { id: 8, number: 'Фонд 8', title: 'ОПЕРА "ЗОЛОТИЙ ОБРУЧ"', column: 4 },
  { id: 9, number: 'Фонд 9', title: 'КРИТИЧНІ МАТЕРІАЛИ', column: 1 },
  { id: 10, number: 'Фонд 10', title: 'ПРОГРАМКИ КОНЦЕРТІВ', column: 2 }
];

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
      xs: '40px',
      sm: '60px',
      md: '80px',
      lg: '97px'
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
    rowGap: {
      xs: '40px',
      sm: '60px',
      md: '80px'
    }
  }
};

const getColumnPaddingTop = (columnNum: number) => ({
  xs: columnNum === 1 ? '56px' : '0px',
  sm: columnNum === 1 ? '40px' : '0px',
  md: columnNum === 1 ? '80px' : columnNum === 2 ? '40px' : '0px',
  lg: columnNum === 1 ? '120px' : columnNum === 2 ? '80px' : columnNum === 3 ? '40px' : '0px'
});

export default function Archive() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFunds = FUNDS_DATA.filter((fund) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return fund.number.toLowerCase().includes(query) || fund.title.toLowerCase().includes(query);
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const fundsByColumn: Record<number, typeof FUNDS_DATA> = {
    1: [],
    2: [],
    3: [],
    4: []
  };

  filteredFunds.forEach((fund) => {
    fundsByColumn[fund.column].push(fund);
  });

  return (
    <MainLayout withLines={!isMobile}>
      <Box sx={styles.pageWrapper} data-testid="ArchivePage">
        <ArchiveHeader onSearch={handleSearch} />

        <Box sx={styles.fundsGrid} data-testid="ArchivePage-fundsGrid">
          {[1, 2, 3, 4].map((columnNum) => (
            <Box
              key={`column-${columnNum}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: {
                  xs: '16px',
                  sm: '16px',
                  md: '16px',
                  lg: '80px'
                },
                paddingTop: getColumnPaddingTop(columnNum)
              }}
            >
              {fundsByColumn[columnNum].map((fund) => (
                <FundCard key={fund.id} id={fund.id} number={fund.number} title={fund.title} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
}
