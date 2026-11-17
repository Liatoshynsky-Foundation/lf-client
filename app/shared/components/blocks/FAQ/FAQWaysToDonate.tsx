import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { renderBold } from '../../rich-text/RichTextComponents';
import { styles } from './FAQ.styles';

export const WaysToDonate = () => {
  const t = useTranslations('supportUs.faq');
  return (
    <>
      <Typography variant="customMedium18">{t('items.waysToDonate.intro')}</Typography>
      <Box component="ol" sx={styles.orderedList}>
        <Box component="li">
          <Typography variant="customMedium18" component="div">
            {t.rich('items.waysToDonate.bankTransfer.title', { b: renderBold })}
          </Typography>
          <Typography variant="customMedium18">{t('items.waysToDonate.bankTransfer.description')}</Typography>
          <Box component="ul" sx={styles.nestedList}>
            {(['national', 'international'] as const).map((country) => (
              <Box component="li" key={country}>
                <Typography variant="customMedium18">
                  {t.rich(`items.waysToDonate.bankTransfer.byCountry.${country}`, { b: renderBold })}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="customMedium18">{t('items.waysToDonate.bankTransfer.advice')}</Typography>
        </Box>
        <Box component="li">
          <Typography variant="customMedium18" component="div">
            {t.rich('items.waysToDonate.wayForPay.title', { b: renderBold })}
          </Typography>
          <Typography variant="customMedium18">{t('items.waysToDonate.wayForPay.description')}</Typography>
          <Box component="ul" sx={styles.nestedList}>
            {(['card', 'googlePay', 'multicurrency'] as const).map((method) => (
              <Box component="li" key={method}>
                <Typography variant="customMedium18">
                  {t.rich(`items.waysToDonate.wayForPay.methods.${method}`, { b: renderBold })}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
