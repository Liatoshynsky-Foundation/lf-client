import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { renderBold } from '../../rich-text/RichTextComponents';
import { styles } from './FAQ.styles';

export const CardSafety = () => {
  const t = useTranslations('supportUs.faq');
  return (
    <>
      <Typography variant="customMedium18">{t('items.cardSafety.description')}</Typography>
      <Box component="ul" sx={styles.nestedList}>
        {(['pci', 'encryption', '3d'] as const).map((standard) => (
          <Box component="li" key={standard}>
            <Typography variant="customMedium18">
              {t.rich(`items.cardSafety.standards.${standard}`, { b: renderBold })}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="customMedium18">{t.rich('items.cardSafety.alternative', { b: renderBold })}</Typography>
    </>
  );
};
