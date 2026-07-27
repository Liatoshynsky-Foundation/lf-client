import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import Button from '~/ds-components/button/Button';

import { styles } from './pageNotFound.styles';

export async function PageNotFound() {
  const t = await getTranslations('common');

  return (
    <Box component="main" id="main" sx={styles.mainContainer}>
      <Typography variant="h2" sx={styles.titleText}>
        {t('pageNotFound.errorTitle')}
      </Typography>
      <Typography sx={styles.blockDescription}>{t('pageNotFound.errorMessage')}</Typography>
      <Button size="medium" variant="contained" color="tertiary" label={t('goHome')} link="/" />
      <Box sx={styles.icon}>
        <Image src="/images/pageNotFound.svg" alt="Page not found (404)" fill />
      </Box>
    </Box>
  );
}
