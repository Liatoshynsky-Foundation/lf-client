import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import UnderDevelopment from '~/components/under-development/UnderDevelopment';
import BaseCard, { type BaseCardProps } from '~/ds-components/base-card/BaseCard';

import { isProductionMode } from '~/utils/isProductionMode';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { mockPressCards } from '~/shared/mock-data/newsAndMedia.mock';

export default function MediaAboutUs(): ReactElement {
  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout withLines>
      <Box
        sx={{
          display: 'grid',
          gridColumn: '1 / -1',
          gridTemplateColumns: {
            xs: 'repeat(4, 1fr)',
            sm: 'repeat(8, 1fr)',
            md: 'repeat(12, 1fr)'
          },
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
        }}
      >
        <Box
          sx={{
            gridColumn: '1 / -1',
            marginBottom: { xs: '40px', md: '56px', lg: '64px' }
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '40px', md: '64px' },
              marginBottom: '16px'
            }}
          >
            Ми у ЗМІ
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '16px', md: '18px' },
              color: 'blue.700'
            }}
          >
            Публікації та згадки про Фундацію у медіа
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumn: '1 / -1',
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: { xs: '24px', md: '32px', lg: '40px' },
            paddingBottom: { xs: '80px', md: '120px' }
          }}
        >
          {mockPressCards.map((card: Omit<BaseCardProps, 'variant'>, index: number) => (
            <BaseCard key={index} {...card} variant="press" />
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
}
