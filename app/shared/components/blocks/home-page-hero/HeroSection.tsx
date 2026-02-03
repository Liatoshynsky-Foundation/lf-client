'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import heroIcon from './hero-icon.png';
import heroBackgroundImage from './hero-image.png';
import { heroSectionStyles } from './HeroSection.styles';

import Button from '~/shared/components/design-system/all-components/button/Button';

export const HomePageHero: React.FC = () => {
  return (
    <Box sx={heroSectionStyles.backgroundContainer}>
      {/* Full-bleed background image */}
      <Image
        src={heroBackgroundImage}
        alt="Hero background"
        fill
        priority
        quality={90}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />

      {/* Overlay for better text readability */}
      <Box sx={heroSectionStyles.overlay} />

      {/* Content wrapper with grid */}
      <Box sx={heroSectionStyles.contentWrapper}>
        {/* Right-aligned content block */}
        <Box sx={heroSectionStyles.rightContentBlock}>
          {/* Hero Icon */}
          <Image
            src={heroIcon}
            alt="Lyatoshynsky Foundation Icon"
            style={{
              width: 'auto',
              height: 'auto'
            }}
            priority
          />

          {/* Text Paragraph */}
          <Typography sx={heroSectionStyles.textParagraph}>
            Preserving and celebrating the legacy of Ukrainian composer Borys Lyatoshynsky through education, research,
            and cultural initiatives.
          </Typography>

          {/* Main Text */}
          <Typography component="h1" sx={heroSectionStyles.mainText}>
            Welcome to Lyatoshynsky Foundation
          </Typography>
        </Box>

        {/* Centered bottom button */}
        <Box sx={heroSectionStyles.buttonContainer}>
          <Button variant="contained" color="tertiary" size="large" sx={heroSectionStyles.ctaButton} link="#explore">
            Explore Our Work
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
