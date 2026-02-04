import { Box, Typography } from '@mui/material';
import { useLocale } from 'next-intl';

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
      <Typography sx={styles.subTitle} variant="h5">
        {subTitle[locale]}
      </Typography>
      <ButtonContentBlock
        buttonText={buttonText[locale]}
        content={textContent[locale]}
        link={buttonLink}
        textSx={styles.textStyle}
        sx={{ maxWidth: { xs: '247px' }, minWidth: { xs: '247px' } }}
        buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
        textContainerSx={{ mt: { xs: '16px', md: '24px' } }}
      />
    </Box>
  );
}
