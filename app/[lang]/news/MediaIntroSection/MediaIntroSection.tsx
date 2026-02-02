import { Box, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import { styles } from './MediaIntroSection.styles';

import { mediaBigDoc, mediaSmallDoc } from '~/shared/components/blocks/media-center/media.const';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

export default function MediaIntroSection() {
  const locale = useLocale();
  const t = useTranslations('media');

  return (
    <Box sx={styles.gridContainer}>
      <Box sx={styles.titleSection}>
        <Typography sx={styles.titleText} variant="h1">
          {t('title')}
        </Typography>
      </Box>
      <Box sx={styles.textBlockContainer}>
        <ContentBlock textSx={styles.longText} description={mediaBigDoc[locale]} />
        <ContentBlock textSx={{ gridColumn: '1 / -1', mt: '16px' }} description={mediaSmallDoc[locale]} />
      </Box>
    </Box>
  );
}
