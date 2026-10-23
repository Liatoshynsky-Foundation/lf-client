'use client';

import { Box } from '@mui/material';
import React from 'react';

import LanguageSwitcher from '~/ds-components/language-switcher/LanguageSwitcher';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
import SupportButton from '../SupportButton/SupportButton';
import { styles } from './RightActionsPanel.styles';
import type { ScrollDirection } from '~/types/types/common.types';
import { type SupportButtonData } from '~/types/types/header.type';

interface SupportButtonDataProps {
  supportButtonData: SupportButtonData;
  scrollDirection: ScrollDirection;
}

export default function RightActionsPanel({ supportButtonData, scrollDirection }: Readonly<SupportButtonDataProps>) {
  const { isMobile } = useBreakpoints();

  return (
    <Box sx={styles.backgroundContainer}>
      <Box sx={styles.controls}>
        <AudioPlayer />
        <Box sx={styles.languageSwitcher(isMobile)}>
          <LanguageSwitcher variant="icon" scrollDirection={scrollDirection} />
        </Box>
      </Box>
      <SupportButton data={supportButtonData} isMobile={isMobile} />
    </Box>
  );
}
