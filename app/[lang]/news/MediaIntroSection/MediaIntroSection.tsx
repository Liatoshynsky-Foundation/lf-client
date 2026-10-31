import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { styles } from './MediaIntroSection.styles';
import { PublicationsPage } from '~/types/page/pagesBase.type';

import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

type PublicationsIntroData = PublicationsPage['blocks']['PublicationsIntro'];

interface MediaIntroSectionProps {
  readonly data: PublicationsIntroData;
}

export default function MediaIntroSection({ data }: MediaIntroSectionProps) {
  const t = useTranslations('media');

  return (
    <Box sx={styles.gridContainer}>
      <Box sx={styles.titleSection}>
        <Typography sx={styles.titleText} variant="h1">
          {t('title')}
        </Typography>
      </Box>
      <Box sx={styles.textBlockContainer}>
        <ContentBlock textSx={styles.longText} description={data.publicationsIntro} />
        <ContentBlock textSx={{ gridColumn: '1 / -1', mt: '16px' }} description={data.publicationsOutro} />
      </Box>
    </Box>
  );
}
