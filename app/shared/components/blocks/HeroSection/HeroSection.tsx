import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocale, useTranslations } from 'next-intl';

import ContentBlock from '~/components/design-system/all-components/content-block/ContentBlock';
import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import QuoteBlock from '~/components/Quote/Quote';

import { heroBiographyDoc, heroNoteDoc, heroTexts } from './HeroSection.content';
import { heroSectionStyles } from './HeroSection.style';

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations('biography.heroSection');

  return (
    <Box sx={heroSectionStyles.mainContainer} data-testid="HeroSection">
      <Box sx={heroSectionStyles.topContainer} data-testid="HeroSection-topContainer">
        <Box sx={heroSectionStyles.titleWithQuoteContainer} data-testid="HeroSection-titleWithQuoteContainer">
          <Box data-testid="HeroSection-title">
            <Typography sx={heroSectionStyles.title}>{t('title')}</Typography>
          </Box>

          <QuoteBlock
            quoteText={heroTexts.quoteText[locale]}
            sourceText={heroTexts.sourceText[locale]}
            quoteIconColor="burgundy"
            mainTextColor="burgundy"
            alignRight={false}
            sx={heroSectionStyles.quoteContainer}
            width={{ xs: '100%' }}
            dataTestId="HeroSection-quoteBlock"
          />
        </Box>

        <Box sx={heroSectionStyles.photoContainer} data-testid="HeroSection-photoContainer">
          {heroTexts.image && (
            <ImageWithCaption
              src={heroTexts.image.src}
              alt={heroTexts.image.alt[locale]}
              caption={heroTexts.imageCaption[locale]}
              sizes={heroSectionStyles.imageSizes}
              containerSx={heroSectionStyles.imageWithCaptionContainer}
              imageSx={{ width: '100%' }}
              captionSx={heroSectionStyles.caption}
              align="right"
              dataTestId="HeroSection-imageCaption"
            />
          )}
        </Box>
      </Box>

      <Box sx={heroSectionStyles.bottomContainer} data-testid="HeroSection-bottomContainer">
        <ContentBlock
          description={heroBiographyDoc[locale]}
          containerSx={heroSectionStyles.biographyContainer}
          textSx={heroSectionStyles.biographyText}
          dataTestId="HeroSection-biographyContainer-contentBlock"
        />
        <ContentBlock
          description={heroNoteDoc[locale]}
          containerSx={heroSectionStyles.noteContainer}
          textSx={heroSectionStyles.noteText}
          dataTestId="HeroSection-noteContainer-contentBlock"
        />
      </Box>
    </Box>
  );
}
