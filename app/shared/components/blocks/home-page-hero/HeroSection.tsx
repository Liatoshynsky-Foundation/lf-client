'use client';

import { Box, ButtonBase } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import heroBackgroundImage from './hero-image.png';
import { heroSectionStyles } from './HeroSection.styles';
import { HeroSectionQuoteBlock } from './HeroSectionQuoteBlock';
import LogoSvg from './logo.svg';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export interface HeroProps {
  heroQuote: string;
  heroQuoteSource: string;
}

export const HeroSection: React.FC<HeroProps> = ({ heroQuote, heroQuoteSource }) => {
  const { togglePlay } = useAudioPlayer();
  const bp = useBreakpoints();

  const heroContent = <HeroSectionQuoteBlock heroQuote={heroQuote} heroQuoteSource={heroQuoteSource} />;

  return (
    <Box sx={heroSectionStyles.heroSection}>
      <ButtonBase onClick={togglePlay} sx={heroSectionStyles.backgroundContainer}>
        <Image
          src={heroBackgroundImage}
          alt="Hero background"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: `${bp.isMobile ? '18% 50%' : 'center'}`
          }}
        />
        {bp.isLaptopAndAbove && heroContent}
      </ButtonBase>
      <Box sx={{ position: 'relative', height: 'auto' }}>
        <LogoSvg style={{}} />
      </Box>
      {(bp.isMobile || bp.isTablet) && heroContent}
    </Box>
  );
};
