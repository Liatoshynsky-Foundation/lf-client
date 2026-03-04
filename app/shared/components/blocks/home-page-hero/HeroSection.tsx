'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { BoxButton } from './custom-cursor/BoxButton/BoxButton';
import { HeroSectionQuoteBlock } from './hero-section-quote-block/HeroSectionQuoteBlock';
import { heroSectionStyles } from './HeroSection.styles';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export type HeroProps = {
  heroQuote: string;
  heroQuoteSource: string;
  playbackButton: {
    startPlayback: string;
    stopPlayback: string;
  };
};

const imagesPaths = {
  heroBackgroundImage: '/images/main-page-hero-section/hero-background-image.png',
  heroCharacterImage: '/images/main-page-hero-section/hero-character-image.png',
  textLogo: '/images/main-page-hero-section/textLogo.svg',
  pauseIcon: '/images/main-page-hero-section/pause-icon.svg',
  playIcon: '/images/main-page-hero-section/play-icon.svg'
};

export const HeroSection: React.FC<HeroProps> = ({ heroQuote, heroQuoteSource, playbackButton }) => {
  const { isPlaying, togglePlay } = useAudioPlayer();
  const bp = useBreakpoints();

  const heroContent = <HeroSectionQuoteBlock heroQuote={heroQuote} heroQuoteSource={heroQuoteSource} />;

  return (
    <Box sx={heroSectionStyles.heroSection} data-testid="hero-section">
      <BoxButton
        testID="hero-playback-button"
        onClick={togglePlay}
        cursorContent={{
          text: isPlaying ? playbackButton.stopPlayback : playbackButton.startPlayback,
          iconSrc: isPlaying ? imagesPaths.pauseIcon : imagesPaths.playIcon
        }}
        customSX={heroSectionStyles.clickableArea}
      >
        <Box sx={heroSectionStyles.backgroundContainer}>
          <Image
            src={imagesPaths.heroBackgroundImage}
            alt="Hero background photo"
            fill
            priority
            quality={90}
            data-testid="hero-background-image"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <Box sx={heroSectionStyles.heroCharacter}>
            <Image
              src={imagesPaths.heroCharacterImage}
              alt="Hero character photo"
              priority
              fill
              quality={90}
              data-testid="hero-character-image"
              style={{
                objectFit: `${bp.isLaptopAndAbove ? 'contain' : 'cover'}`,
                objectPosition: 'center'
              }}
            />
          </Box>
          {bp.isLaptopAndAbove && heroContent}
        </Box>
      </BoxButton>
      <Box sx={heroSectionStyles.textLogoStyle}>
        <SvgImage
          src={imagesPaths.textLogo}
          alt="Lyatoshynsky Foundation"
          width={1400}
          height={165}
          data-testid="hero-text-logo"
        />
      </Box>
      {(bp.isMobile || bp.isTablet) && heroContent}
    </Box>
  );
};
