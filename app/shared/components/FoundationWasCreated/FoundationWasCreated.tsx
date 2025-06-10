import { Box, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './FoundationWasCreated.styles';

const FoundationWasCreated = async () => {
  const t = await getTranslations('foundation');
  return (
    <Box sx={styles.container}>
      <Box sx={styles.ellipseWrapper}>
        <SvgImage src="icons/ellipse.svg" alt="ellipse" width={32} height={30} />
      </Box>
      <Box sx={styles.text}>
        <Typography sx={styles.title}>{t('foundationWasCreated')}</Typography>
        <Typography sx={styles.description}>{t('foundationWasCreatedDescription')}</Typography>
      </Box>
    </Box>
  );
};

export default FoundationWasCreated;
