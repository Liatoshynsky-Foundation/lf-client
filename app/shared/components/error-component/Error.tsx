import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { styles } from './Error.styles';

import OoPs from '~/public/images/OoPs.svg';

export default function ErrorComponent() {
  const t = useTranslations('error');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageContainer}>
        <OoPs />
        <Box sx={styles.carContainer}>
          <Image alt="kotyk" src="/images/kotyk.png" layout="fill" objectFit="contain" />
        </Box>
      </Box>
      <Typography variant="h2" sx={styles.text}>
        {t('title')}
      </Typography>
      <Typography variant="customMedium16">{t('subtitle')}</Typography>
    </Box>
  );
}
