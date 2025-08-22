import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import QuoteBlock from '~/components/Quote/Quote';
import { theme } from '~/ds-components/theme/Theme';

import { styles } from './IntroSection.styles';
import { IIntroSection } from '~/types/types/about-us.types';

export default function IntroSection({ data }: { readonly data: IIntroSection }) {
  const sectionStyles = styles(theme);
  const { title, image, quote } = data;

  return (
    <Box sx={sectionStyles.container}>
      <Typography sx={sectionStyles.title}>{title}</Typography>
      <Box sx={sectionStyles.photoContainer}>
        {image && (
          <ImageWithCaption
            src={image.src}
            alt={image.alt}
            caption={image.caption ?? ''}
            sizes={{
              width: { xs: 266, sm: 456, md: 567, lg: 717, xl: 816, xxl: 979 },
              height: { xs: 158, sm: 264, md: 300 }
            }}
            border={{
              sizes: {
                width: { xs: 134, sm: 255, md: 269, lg: 376 },
                height: { xs: 28, sm: 55, md: 52, lg: 72 }
              },
              top: { xs: 16, sm: 20, md: 36, lg: 38, xl: 34 },
              left: { xs: 16, sm: 26, md: 41, lg: 40, xl: 40 }
            }}
            containerSx={sectionStyles.ImageContainer}
            captionSx={sectionStyles.ImageCaption}
          />
        )}
      </Box>
      <Box sx={sectionStyles.quote}>
        {quote && (
          <QuoteBlock
            quoteText={quote.text}
            sourceText={quote.source}
            quoteIconColor="burgundy"
            mainTextColor="burgundy"
            alignRight={false}
          />
        )}
      </Box>
    </Box>
  );
}
