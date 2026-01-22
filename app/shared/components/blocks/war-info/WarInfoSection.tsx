import { Box, type BoxProps, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import ContentBlock from '~/components/design-system/all-components/content-block/ContentBlock';

import { style } from './WarInfoSection.style';
import { sxToArray } from '~/utils/sxToArray';

import { warSupportDoc } from '~/[lang]/war-in-ukraine/war.const';

export type WarInfoSectionProps = BoxProps;

const WarInfoSection: React.FC<WarInfoSectionProps> = ({ sx, ...props }) => {
  const t = useTranslations('warSupport');
  const locale = useLocale();

  return (
    <Box sx={[style.gridContainer, ...sxToArray(sx)]} {...props}>
      <Box sx={style.titleSection}>
        <Typography variant="h1" sx={style.titleText}>
          {t('title')}
        </Typography>
      </Box>
      <ContentBlock
        description={warSupportDoc[locale]}
        textSx={style.contentText}
        containerSx={style.textBlockContainer}
      />
    </Box>
  );
};

export default WarInfoSection;
