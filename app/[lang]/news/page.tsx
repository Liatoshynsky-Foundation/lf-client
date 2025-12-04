'use client';

import { Box, Typography } from '@mui/material';

import MainLayout from '~/layouts/main-layout/MainLayout';
import BaseCard from '~/shared/components/design-system/all-components/base-card/BaseCard';
import { mockNewsCards } from '~/shared/mock-data/newsAndMedia.mock';

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
      lg: '95px',
      xl: '97px'
    }
  },

  headerSection: {
    gridColumn: {
      xs: '1 / -1',
      md: '1 / 7',
      lg: '1 / 6'
    },
    marginBottom: {
      xs: '40px',
      sm: '56px',
      md: '64px',
      lg: '80px'
    }
  },

  title: {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 600,
    fontSize: {
      xs: '40px',
      md: '64px'
    },
    lineHeight: '120%',
    color: '#000',
    textTransform: 'uppercase'
  },

  cardsGrid: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(auto-fit, minmax(400px, 1fr))',
      xl: 'repeat(3, 1fr)'
    },
    columnGap: {
      xs: '24px',
      md: '32px',
      lg: '40px'
    },
    rowGap: {
      xs: '40px',
      md: '48px',
      lg: '56px'
    },
    paddingBottom: {
      xs: '80px',
      sm: '96px',
      md: '104px',
      lg: '120px'
    }
  }
};

export default function News() {
  return (
    <MainLayout withLines>
      <Box sx={styles.pageWrapper} data-testid="NewsPage">
        <Box sx={styles.headerSection}>
          <Typography variant="h2" sx={styles.title}>
            Новини
          </Typography>
        </Box>

        <Box sx={styles.cardsGrid} data-testid="NewsPage-cardsGrid">
          {mockNewsCards.map((card, index) => (
            <BaseCard key={index} {...card} variant="news" />
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
}
