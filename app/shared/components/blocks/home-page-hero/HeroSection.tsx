'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import heroBackgroundImage from './hero-background-image.png';
import heroCharacterImage from './hero-character-image.png';
import { heroSectionStyles } from './HeroSection.styles';
import { HeroSectionQuoteBlock } from './HeroSectionQuoteBlock';
import LogoSvg from './logo.svg';

import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export type HeroProps = {
  heroQuote: string;
  heroQuoteSource: string;
};

export const HeroSection: React.FC<HeroProps> = ({ heroQuote, heroQuoteSource }) => {
  const { togglePlay } = useAudioPlayer();
  const bp = useBreakpoints();

  const heroContent = <HeroSectionQuoteBlock heroQuote={heroQuote} heroQuoteSource={heroQuoteSource} />;

  return (
    <Box sx={heroSectionStyles.heroSection}>
      <Box onClick={togglePlay} sx={heroSectionStyles.clickableArea}>
        <Box sx={heroSectionStyles.backgroundContainer}>
          <Image
            src={heroBackgroundImage}
            alt="Hero background photo"
            fill
            priority
            quality={90}
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <Box sx={heroSectionStyles.heroCharacter}>
            <Image
              src={heroCharacterImage}
              alt="Hero character photo"
              priority
              fill
              quality={90}
              style={{
                objectFit: `${bp.isLaptopAndAbove ? 'contain' : 'cover'}`,
                objectPosition: 'center'
              }}
            />
          </Box>
          {bp.isLaptopAndAbove && heroContent}
        </Box>
      </Box>
      <LogoSvg
        style={{
          display: 'block',
          maxWidth: 1728,
          margin: '0 auto'
        }}
      />
      {(bp.isMobile || bp.isTablet) && heroContent}
    </Box>
  );
};
