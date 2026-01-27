import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import QuoteBlock from '~/components/Quote/Quote';

import { styles } from './IntroSection.styles';
import { IIntroSection } from '~/types/page/about-us.types';

export function IntroSection({ data }: { readonly data: IIntroSection }) {
  const { title, image, quote } = data;

  return (
    <Box sx={styles.container} data-testid="IntroSection">
      <Typography variant="h1" sx={styles.title} data-testid="IntroSection-title">
        {title}
      </Typography>
      <Box sx={styles.photoContainer} data-testid="IntroSection-photoContainer">
        {image && (
          <ImageWithCaption
            src={image.generatedSrc}
            alt={image.alt}
            caption={image.caption ?? ''}
            sizes={{
              width: { xs: 224, sm: 457, md: 569, lg: 718, xl: 816, xxl: 979 },
              height: { xs: 130, sm: 264, md: 300 }
            }}
            border={{
              sizes: {
                width: { xs: 134, sm: 255, md: 271, lg: 334, xl: 376 },
                height: { xs: 28, sm: 55, md: 52, lg: 64, xl: 72 }
              },
              top: { xs: 15, sm: 28, md: 31, lg: 32, xl: 34 },
              left: { xs: 17, sm: 24, md: 41, lg: 40, xl: 40 }
            }}
            containerSx={styles.imageContainer}
            captionSx={styles.imageCaption}
            imageSx={{ width: { xs: '80vw', sm: '60vw', xxl: '980px' } }}
            dataTestId="IntroSection-imageCaption"
          />
        )}
      </Box>
      <Box sx={styles.quote} data-testid="IntroSection-quote">
        {quote && (
          <QuoteBlock
            quoteText={quote.text}
            sourceText={quote.source}
            quoteIconColor="burgundy"
            mainTextColor="burgundy"
            alignRight={false}
            sx={styles.quoteBlock}
            dataTestId="IntroSection-quoteBlock"
          />
        )}
      </Box>
    </Box>
  );
}
