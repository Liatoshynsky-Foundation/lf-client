import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import heroIcon from './hero-icon.png';
import { heroSectionStyles } from './HeroSection.styles';

export interface HeroSectionQuoteProps {
  heroQuote: string;
  heroQuoteSource: string;
}

export const HeroSectionQuoteBlock: React.FC<HeroSectionQuoteProps> = ({ heroQuote, heroQuoteSource }) => {
  return (
    <Box sx={heroSectionStyles.contentWrapper}>
      <Box sx={heroSectionStyles.rightContentBlock}>
        <Image
          src={heroIcon}
          alt="Lyatoshynsky Foundation Icon"
          style={{
            width: '60px',
            height: '50px'
          }}
          priority
        />

        <Typography sx={heroSectionStyles.textParagraph}> {heroQuote} </Typography>
        <Typography sx={heroSectionStyles.smallText}> {heroQuoteSource} </Typography>
      </Box>
    </Box>
  );
};
