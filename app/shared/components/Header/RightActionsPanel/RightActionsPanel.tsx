'use client';

import { Box } from '@mui/material';
import React from 'react';

import LanguageSwitcher from '~/ds-components/language-switcher/LanguageSwitcher';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
import SupportButton from '../SupportButton/SupportButton';
import { styles } from './RightActionsPanel.styles';
import { SupportButtonDataProps } from '~/types/types/header.type';

export default function RightActionsPanel({ supportButtonData }: SupportButtonDataProps) {
  const { isMobile } = useBreakpoints();

  return (
    <Box sx={styles.rightContainer}>
      <AudioPlayer
        src="/music/sample-music.mp3"
        trackName="Symphony No. 3 In B Minor, Op. 50: Iv. Allegro Risoluto"
        autoplay={false}
      />
      <Box sx={styles.buttonsContainer(isMobile)}>
        <LanguageSwitcher variant="icon" />
        <SupportButton data={supportButtonData} />
      </Box>
    </Box>
  );
}
