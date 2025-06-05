import { Box, Typography } from '@mui/material';
import Quote from '~/shared/components/Quote/Quote';
import Button from '~/shared/components/design-system/all-components/button/Button';
import { styles } from './LiatoshynskyOffice.styles';
import OfficeMedia from '~/shared/components/Liatoshynsky-office/office-media/OfficeMedia';
import { ImageData } from '~/types/types/officeMedia';
import { Oswald } from 'next/font/google';
import { Link } from '~/i18n/navigation';
import React from 'react';
import { getTranslations } from 'next-intl/server';

const oswald = Oswald({ weight: '700', subsets: ['latin'], display: 'swap' });

const LiatoshynskyOffice = async () => {
  const officeT = await getTranslations('home.liatoshynskyOffice');
  const quoteT = await getTranslations('quote');

  const images: ImageData[] = [
    { src: '/images/lf-office-2.png', alt: 'Фото 1', styleKey: 'photo1' },
    { src: '/images/lf-office-1.png', alt: 'Фото 2', styleKey: 'photo2' },
    { src: '/images/lf-office-3.png', alt: 'Фото 3', styleKey: 'photo3' }
  ];

  const liatoshynskyOfficeInfo = {
    office: officeT('office'),
    name: officeT('name')
  };

  const quoteInfo = {
    mainText: quoteT('mainText'),
    sourceTittle: quoteT('sourceText.tittle'),
    sourceData: quoteT('sourceText.data'),
    sourcePlace: quoteT('sourceText.place')
  };

  const buttonInfo = {
    link: '/office',
    text: officeT('goToOfficeButton')
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.trapezoid} />
      <Box sx={styles.contentContainer}>
        <Box sx={styles.quoteBlock}>
          <Quote
            quoteText={quoteInfo.mainText}
            sourceText={{
              tittle: quoteInfo.sourceTittle,
              data: quoteInfo.sourceData,
              place: quoteInfo.sourcePlace
            }}
            quoteIconColor="black"
            mainTextColor="black"
            alignRight
          />
        </Box>
        <Box sx={styles.textBlock} className={oswald.className}>
          <Typography sx={styles.text}>{liatoshynskyOfficeInfo.office}</Typography>
          <Typography sx={[styles.text, styles.indentedLine]}>{liatoshynskyOfficeInfo.name}</Typography>
        </Box>
        <Box sx={styles.media}>
          <OfficeMedia images={images} />
        </Box>
        <Box sx={styles.buttonBlock}>
          <Link href={buttonInfo.link} passHref>
            <Button size="large" color="primary" label={buttonInfo.text} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LiatoshynskyOffice;
