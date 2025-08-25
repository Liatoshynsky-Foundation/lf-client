import { Box, Typography } from '@mui/material';
import { Oswald } from 'next/font/google';
import type { useTranslations } from 'next-intl';
import React from 'react';

import OfficeMedia from '~/components/blocks/Liatoshynsky-office/office-media/OfficeMedia';
import Quote from '~/components/Quote/Quote';
import Button from '~/ds-components/button/Button';

import { styles } from './LiatoshynskyOffice.styles';
import { ILiatoshynskyOffice } from '~/types/page/about-us.types';

const oswald = Oswald({ weight: '700', subsets: ['latin'], display: 'swap' });

const LiatoshynskyOffice = ({ data, t }: { data: ILiatoshynskyOffice; t: ReturnType<typeof useTranslations> }) => {
  const { quote } = data;
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.trapezoid} />
      <Box sx={styles.contentContainer}>
        <Box sx={styles.quoteBlock}>
          <Quote
            quoteText={quote?.text}
            sourceText={quote?.source}
            quoteIconColor="black"
            mainTextColor="black"
            alignRight
          />
        </Box>
        <Box sx={styles.textBlock} className={oswald.className}>
          <Typography sx={styles.text}>{t('office')}</Typography>
          <Typography sx={[styles.text, styles.indentedLine]}>{t('name')}</Typography>
        </Box>
        <Box sx={styles.media}>
          <OfficeMedia />
        </Box>
        <Box sx={styles.buttonBlock}>
          <Button size="large" color="primary" variant="contained" link="/office" label={t('goToOfficeButton')} />
        </Box>
      </Box>
    </Box>
  );
};

export default LiatoshynskyOffice;
