'use client';

import { Box } from '@mui/material';
import React from 'react';

import LanguageSwitcher from '~/ds-components/language-switcher/LanguageSwitcher';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
import SupportButton from '../SupportButton/SupportButton';
import { styles } from './RightActionsPanel.styles';
import { type SupportButtonData } from '~/types/types/header.type';

interface SupportButtonDataProps {
  supportButtonData: SupportButtonData;
}

export default function RightActionsPanel({ supportButtonData }: Readonly<SupportButtonDataProps>) {
  const { isMobile, isTablet } = useBreakpoints();

  return (
    <Box sx={styles.backgroundContainer(isMobile, isTablet)}>
      <Box sx={styles.rightContainer}>
        <AudioPlayer />
        <Box sx={styles.buttonsContainer(isMobile)}>
          <LanguageSwitcher variant="icon" />
          <SupportButton data={supportButtonData} />
        </Box>
      </Box>
    </Box>
  );
}
