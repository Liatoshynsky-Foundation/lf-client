'use client';

import { Box } from '@mui/material';
import React from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer';

export default function Header() {
  return (
    <Box component="header">
      <AudioPlayer
        src="music/sample-music.mp3"
        trackName="Symphony No. 3 In B Minor, Op. 50: Iv. Allegro Risoluto"
        autoplay={false}
      />
    </Box>
  );
}
