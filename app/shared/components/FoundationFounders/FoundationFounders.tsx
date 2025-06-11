import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { styles } from '~/components/FoundationFounders/FoundationFounders.styles';
import FoundationTeam from '~/components/FoundationFounders/FoundationTeam/FoundationTeam';
import FoundationWasCreated from '~/components/FoundationFounders/FoundationWasCreated/FoundationWasCreated';

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
