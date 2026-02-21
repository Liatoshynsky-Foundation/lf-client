import { Box, SxProps, Theme, Typography } from '@mui/material';
import { type Locale, useLocale } from 'next-intl';
import React from 'react';

import BiographyGallery from '~/components/BiographyGallery/BiographyGallery';
import { biographyGalleryPhotos } from '~/components/BiographyGallery/BiographyGallery.data';
import { buildFrameImages } from '~/components/BiographyGallery/buildBiographyFrameImages';
import ButtonContentBlock from '~/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';

import { styles } from './BiographySection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

type LocalizedString = Record<Locale, string>;
type LocalizedTipTapDoc = Record<Locale, TipTapDoc>;

interface Props {
  title: LocalizedString;
  spanText: LocalizedString;
  text: LocalizedTipTapDoc;
  ctaLabel: LocalizedString;
  ctaHref: string;
  sx?: SxProps<Theme>;
}

export default function BiographySection({ title, spanText, text, ctaLabel, ctaHref, sx }: Readonly<Props>) {
  const locale = useLocale();
  const images = buildFrameImages(biographyGalleryPhotos);
  return (
    <Box sx={{ ...styles.container, ...sx }} data-testid="BiographySection">
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
      <BiographyGallery images={images}></BiographyGallery>
    </Box>
  );
}
