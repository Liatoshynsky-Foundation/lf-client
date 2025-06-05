import { Box, Typography } from '@mui/material';
import Quote from '~/shared/components/Quote/Quote';
import Button from '~/shared/components/design-system/all-components/button/Button';
import { styles } from './LiatoshynskyOffice.styles';
import OfficeMedia from '~/shared/components/Liatoshynsky-office/office-media/OfficeMedia';
import { ImageData } from '~/types/types/officeMedia';
import { Oswald } from 'next/font/google';

const oswald = Oswald({ weight: '700', subsets: ['latin'], display: 'swap' });

const LiatoshynskyOffice = () => {
  const images: ImageData[] = [
    { src: '/images/lf-office-2.png', alt: 'Фото 1', styleKey: 'photo1' },
    { src: '/images/lf-office-1.png', alt: 'Фото 2', styleKey: 'photo2' },
    { src: '/images/lf-office-3.png', alt: 'Фото 3', styleKey: 'photo3' }
  ];

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.trapezoid} />
      <Box sx={styles.contentContainer}>
        <Box sx={styles.quoteBlock}>
          <Quote
            quoteText={
              'Ах, мила, милий мій котику, коли ж нарешті прийде той час, коли ми будемо разом із тобою, у вітальні, де так гарно, стоїть рояль і багато нот.'
            }
            sourceText={{
              tittle: 'Лист Бориса Лятошинського Маргариті Царевич',
              data: '29 вересня 1957',
              place: 'Берлін'
            }}
            quoteIconColor="black"
            mainTextColor="black"
            alignRight
          />
        </Box>
        <Box sx={styles.textBlock} className={oswald.className}>
          <Typography sx={styles.text}>КабІНет</Typography>
          <Typography sx={[styles.text, styles.indentedLine]}>ЛЯтоШинСькоГO</Typography>
        </Box>
        <Box sx={styles.media}>
          <OfficeMedia images={images} />
        </Box>
        <Box sx={styles.buttonBlock}>
          <Button size="large" color="primary">
            Увійти до кабінету
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LiatoshynskyOffice;
