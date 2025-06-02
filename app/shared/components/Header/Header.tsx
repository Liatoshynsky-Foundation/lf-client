'use client';

import { Box } from '@mui/material';
import React from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import { Chip } from '~/shared/components/design-system/all-components/chip/Chip';

export default function Header() {
  return (
    <Box component="header">
      <AudioPlayer src="sample-music.mp3" trackName="цо (авторський оркестровий варіант)" autoplay={false} />
      <Chip label="4 обрано" variant="filled" />
    </Box>
  );
}
