import { Box, Typography } from '@mui/material';
import { type Locale, useLocale } from 'next-intl';
import React from 'react';

import ButtonContentBlock from '~/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';

import { styles } from './BiographySection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

type LocalizedString = Record<Locale, string>;
type LocalizedTipTapDoc = Record<Locale, TipTapDoc>;

interface ImageItem {
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
}

interface Props {
  title: LocalizedString;
  spanText: LocalizedString;
  text: LocalizedTipTapDoc;
  ctaLabel: LocalizedString;
  ctaHref: string;
  images?: ImageItem[];
}

export default function BiographySection({ title, spanText, text, ctaLabel, ctaHref }: Readonly<Props>) {
  const locale = useLocale();

  return (
    <Box sx={styles.container} data-testid="BiographySection">
      <Box sx={styles.contentContainer} data-testid="BiographySection-contentContainer">
        <Box sx={styles.titleContainer} data-testid="BiographySection-titleContainer">
          <Typography sx={styles.spanText}>{spanText[locale]}</Typography>
          <Typography variant="h2" sx={styles.title}>
            {title[locale]}
          </Typography>
        </Box>
        <ButtonContentBlock
          buttonText={ctaLabel[locale]}
          buttonColor="tertiary"
          content={text[locale]}
          link={ctaHref}
          textSx={styles.text}
          sx={styles.cta}
          buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
          textContainerSx={{ mt: { xs: '32px', md: '40px', lg: '56px' }, mb: { xs: '24px', md: '0px' } }}
        />
      </Box>
      <Box>
        <span>Scroll block</span>
      </Box>
    </Box>
  );
}
