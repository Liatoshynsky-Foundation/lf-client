import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { styles } from '~/components/FoundationFounders/FoundationFounders.styles';
import FoundationTeam from '~/components/FoundationFounders/FoundationTeam/FoundationTeam';
import FoundationWasCreated from '~/components/FoundationFounders/FoundationWasCreated/FoundationWasCreated';

import { ColumnGuides } from '../column-guides/ColumnGuides';

const FoundationFounders = async () => {
  const t = await getTranslations('foundation');

  return (
    <Box id="foundation-founders" sx={styles.container}>
      <ColumnGuides lineColor="rgba(252, 252, 252, 1)" />
      <Box sx={styles.contentContainer}>
        <FoundationWasCreated title={t('foundationWasCreated')} description={t('foundationWasCreatedDescription')} />
        <FoundationTeam title={t('foundationTeam')} />
      </Box>
    </Box>
  );
};

export default FoundationFounders;
