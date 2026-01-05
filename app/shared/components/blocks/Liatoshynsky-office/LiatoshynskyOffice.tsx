import { Box, Typography } from '@mui/material';
import { Oswald } from 'next/font/google';
import type { useTranslations } from 'next-intl';
import React from 'react';

import OfficeMedia from '~/components/blocks/Liatoshynsky-office/office-media/OfficeMedia';
import Quote from '~/components/Quote/Quote';
import Button from '~/ds-components/button/Button';

import { styles } from './LiatoshynskyOffice.styles';
import { ILiatoshynskyOffice } from '~/types/page/about-us.types';

import { getNavigationLink } from '~/lib/utils/navigationHelper';

const oswald = Oswald({ weight: '700', subsets: ['latin'], display: 'swap' });

const LiatoshynskyOffice = async ({
  data,
  t
}: {
  data: ILiatoshynskyOffice;
  t: ReturnType<typeof useTranslations>;
}) => {
  const archiveUrl = await getNavigationLink('/archive', 'archive');

  const { quote } = data;
  return (
    <Box sx={styles.mainContainer} data-testid="LiatoshynskyOffice">
      <Box sx={styles.trapezoid} data-testid="LiatoshynskyOffice-trapezoid" />
      <Box sx={styles.contentContainer} data-testid="LiatoshynskyOffice-contentContainer">
        <Box sx={styles.quoteBlock} data-testid="LiatoshynskyOffice-quoteBlock">
          <Quote
            quoteText={quote?.text}
            sourceText={quote?.source}
            quoteIconColor="black"
            mainTextColor="black"
            alignRight
            sx={styles.quoteSx}
            dataTestId="LiatoshynskyOffice-quote"
          />
        </Box>
        <Box sx={styles.textBlock} className={oswald.className} data-testid="LiatoshynskyOffice-textBlock">
          <Typography sx={styles.text} data-testid="LiatoshynskyOffice-textOffice">
            {t('office')}
          </Typography>
          <Typography sx={[styles.text, styles.indentedLine]} data-testid="LiatoshynskyOffice-textName">
            {t('name')}
          </Typography>
        </Box>
        <Box sx={styles.media} data-testid="LiatoshynskyOffice-media">
          <OfficeMedia dataTestId="LiatoshynskyOffice-officeMedia" />
        </Box>
        <Box sx={styles.buttonBlock} data-testid="LiatoshynskyOffice-buttonBlock">
          <Button
            size="large"
            color="primary"
            variant="contained"
            link={archiveUrl}
            label={t('goToOfficeButton')}
            sx={styles.button}
            data-testid="LiatoshynskyOffice-goToOfficeButton"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LiatoshynskyOffice;
