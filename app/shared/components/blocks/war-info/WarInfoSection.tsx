import { Box, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import ContentBlock from '../../design-system/all-components/content-block/ContentBlock';
import { warSupportDoc } from './war.const';
import { style } from './WarInfoSection.style';

const WarInfoSection = () => {
  const t = useTranslations('warSupport');
  const locale = useLocale();
  return (
    <>
      <Box sx={style.gridContainer}>
        <Box sx={style.titleSection}>
          <Typography variant="h2" sx={style.titleText}>
            {t('title')}
          </Typography>
        </Box>
        <Box sx={style.textBlockContainer}>
          <ContentBlock description={warSupportDoc[locale]} textSx={style.contentText} />
        </Box>
      </Box>
    </>
  );
};

export default WarInfoSection;
