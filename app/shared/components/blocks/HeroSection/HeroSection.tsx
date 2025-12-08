import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';

import ContentBlock from '~/components/design-system/all-components/content-block/ContentBlock';
import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import QuoteBlock from '~/components/Quote/Quote';
import YearTabs from '~/components/year-tabs/YearTabs';

import { heroSectionStyles } from './HeroSection.style';
import { BiographyHeroProps } from '~/types/page/biography.types';

export function HeroSection({ data, years }: Readonly<BiographyHeroProps>) {
  const t = useTranslations('biography.heroSection');

  const caption = `${data.image.caption.mainText}\n${data.image.caption.yearText}`;

  return (
    <Box sx={heroSectionStyles.mainContainer} data-testid="HeroSection">
      <YearTabs years={years} />
      <Box sx={heroSectionStyles.topContainer} data-testid="HeroSection-topContainer">
        <Box sx={heroSectionStyles.titleWithQuoteContainer} data-testid="HeroSection-titleWithQuoteContainer">
          <Box data-testid="HeroSection-title">
            <Typography sx={heroSectionStyles.title}>{t('title')}</Typography>
          </Box>

          <QuoteBlock
            quoteText={data.quote.text}
            sourceText={data.quote.source}
            quoteIconColor="burgundy"
            mainTextColor="burgundy"
            alignRight={false}
            sx={heroSectionStyles.quoteContainer}
            width={{ xs: '100%' }}
            dataTestId="HeroSection-quoteBlock"
          />
        </Box>

        <Box sx={heroSectionStyles.photoContainer} data-testid="HeroSection-photoContainer">
          {data.image && (
            <ImageWithCaption
              src={data.image.src}
              alt={data.image.alt}
              caption={caption}
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
          description={data.biographyText}
          containerSx={heroSectionStyles.biographyContainer}
          textSx={heroSectionStyles.biographyText}
          dataTestId="HeroSection-biographyContainer-contentBlock"
        />
        <ContentBlock
          description={data.noteText}
          containerSx={heroSectionStyles.noteContainer}
          textSx={heroSectionStyles.noteText}
          dataTestId="HeroSection-noteContainer-contentBlock"
        />
      </Box>
    </Box>
  );
}
