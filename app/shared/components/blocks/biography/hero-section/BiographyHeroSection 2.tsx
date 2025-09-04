import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import Quote from '~/shared/components/Quote/Quote';
import { theme } from '~/ds-components/theme/Theme';
import { styles } from './BiographyHeroSection.styles';

interface BiographyHeroProps {
  title: string;
  quote: {
    text: string;
    source: string;
  };
  heroImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  mainText: string;
  archiveInfo?: string;
}

export default function BiographyHero({ title, quote, heroImage, mainText, archiveInfo }: BiographyHeroProps) {
  const sectionStyles = styles(theme);

  return (
    <Container maxWidth="xl">
      <Box sx={sectionStyles.container}>
        <Box sx={sectionStyles.leftSection}>
          <Typography variant="h1" sx={sectionStyles.title}>
            {title}
          </Typography>

          <Box sx={sectionStyles.quoteContainer}>
            <Quote
              quoteText={quote.text}
              sourceText={quote.source}
              quoteIconColor="burgundy"
              mainTextColor="burgundy"
              alignRight={false}
            />
          </Box>
        </Box>

        <Box sx={sectionStyles.rightSection}>
          <Box sx={sectionStyles.imageContainer}>
            <Image src={heroImage.src} alt={heroImage.alt} fill style={{ objectFit: 'cover' }} />
          </Box>
          {heroImage.caption && <Typography sx={sectionStyles.imageCaption}>{heroImage.caption}</Typography>}
        </Box>
      </Box>

       <Box sx={sectionStyles.mainTextSection}>
        <Typography sx={sectionStyles.bodyText}>
          {mainText}
        </Typography>
      </Box>

      {archiveInfo && (
        <Box sx={sectionStyles.archiveSection}>
          <Typography sx={sectionStyles.archiveText}>
            {archiveInfo}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
