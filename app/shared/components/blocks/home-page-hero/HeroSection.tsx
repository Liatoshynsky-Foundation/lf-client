'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import heroIcon from './hero-icon.png';
import heroBackgroundImage from './hero-image.png';
import { heroSectionStyles } from './HeroSection.styles';

import Button from '~/shared/components/design-system/all-components/button/Button';

export const HeroSection: React.FC = () => {
  return (
    <Box sx={heroSectionStyles.backgroundContainer}>
      {/* Full-bleed background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1
        }}
      >
        <Image
          src={heroBackgroundImage}
          alt="Hero background"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Box>

      {/* Content wrapper with grid */}
      <Box sx={heroSectionStyles.contentWrapper}>
        {/* Right-aligned content block */}
        <Box sx={heroSectionStyles.rightContentBlock}>
          {/* Hero Icon */}
          <Image
            src={heroIcon}
            alt="Lyatoshynsky Foundation Icon"
            style={{
              width: '60px',
              height: '50px'
            }}
            priority
          />

          {/* Text Paragraph */}
          <Typography sx={heroSectionStyles.textParagraph}>
            Ви дуже добре сприймаєте музику, дуже тонко її відчуваєте, і я переконаний, що під час другого
            прослуховування ви значно більше почуєте того, що існує «за нотами». Адже, зрештою, ноти — це лише «ноти»,
            майстерність і т. п., але ви ж прекрасно знаєте, що в більшості музичних творів є ще й дещо «за нотами».
          </Typography>

          <Typography sx={heroSectionStyles.smallText}>Борис Лятошинський</Typography>
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
