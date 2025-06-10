import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { styles } from './FoundationFounders.styles';
import FoundationTeam from './FoundationTeam/FoundationTeam';
import FoundationWasCreated from './FoundationWasCreated/FoundationWasCreated';

const FoundationFounders = async () => {
  const t = await getTranslations('foundation');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentContainer}>
        <FoundationWasCreated title={t('foundationWasCreated')} description={t('foundationWasCreatedDescription')} />
        <FoundationTeam title={t('foundationTeam')} />
      </Box>
    </Box>
  );
};

export default FoundationFounders;
