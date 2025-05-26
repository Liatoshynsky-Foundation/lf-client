'use client';
import { Box } from '@mui/material';
import React from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer';

export default function Header() {
  return (
    <Box component="header">
      <AudioPlayer
        src="sample-music.mp3"
        trackName="цо (авторський оркестровий варіант)"
        autoplay={false}
      />
    </Box>
  );
}
