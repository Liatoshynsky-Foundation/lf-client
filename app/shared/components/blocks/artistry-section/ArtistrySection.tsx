import { Box, Typography } from '@mui/material';
import { useLocale } from 'next-intl';

import { ColumnGuides } from '../../column-guides/ColumnGuides';
import ButtonContentBlock from '../terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { styles } from './ArtistrySection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

interface Props {
  subTitle: {
    uk: string;
    en: string;
  };
  textContent: {
    uk: TipTapDoc;
    en: TipTapDoc;
  };
  buttonText: {
    uk: string;
    en: string;
  };
  buttonLink: string;
}

export default function ArtistrySection({ subTitle, textContent, buttonText, buttonLink }: Readonly<Props>) {
  const locale = useLocale();

  return (
    <Box sx={styles.mainContainer}>
      <ColumnGuides />
      <Box sx={styles.transformContainer}>
        <Box sx={styles.contentContainer}>
          <Typography sx={styles.subTitle} variant="h5">
            {subTitle[locale]}
          </Typography>
          <ButtonContentBlock
            buttonText={buttonText[locale]}
            content={textContent[locale]}
            link={buttonLink}
            textSx={styles.textStyle}
            sx={styles.buttonStyle}
            buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
            textContainerSx={{ mt: { xs: '16px', md: '24px' }, mb: { xs: '24px', md: '0px' } }}
          />
        </Box>
      </Box>
    </Box>
  );
}
