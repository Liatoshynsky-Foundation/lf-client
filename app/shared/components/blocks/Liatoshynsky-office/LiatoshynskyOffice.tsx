import { Box, SxProps, Theme, Typography } from '@mui/material';
import { Oswald } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import OfficeMedia from '~/components/blocks/Liatoshynsky-office/office-media/OfficeMedia';
import Quote from '~/components/Quote/Quote';
import Button from '~/ds-components/button/Button';

import { styles } from './LiatoshynskyOffice.styles';
import { ILiatoshynskyOffice } from '~/types/page/about-us.types';

import { getNavigationLink } from '~/lib/utils/navigationHelper';
import { ROUTES } from '~/shared/components/constants/routes';

const oswald = Oswald({ weight: '700', subsets: ['latin'], display: 'swap' });

const LiatoshynskyOffice = async ({ data, sx }: { data: ILiatoshynskyOffice; sx?: SxProps<Theme> }) => {
  const { quote } = data;
  const archiveUrl = await getNavigationLink(ROUTES.ARCHIVE, 'archive');
  const t = await getTranslations('home.liatoshynskyOffice');

  return (
    <Box sx={{ ...(styles.mainContainer as object), ...(sx as object) }} data-testid="LiatoshynskyOffice">
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
