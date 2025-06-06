import { Box } from '@mui/material';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import SupportButton from './SupportButton/SupportButton';

export default async function Header() {
  const t = await getTranslations('header');

  const supportButtonData = {
    text: t('supportButton'),
    link: '/support'
  };

  return (
    <Box component="header">
      <AudioPlayer
        src="music/sample-music.mp3"
        trackName="Symphony No. 3 In B Minor, Op. 50: Iv. Allegro Risoluto"
        autoplay={false}
      />
      <SupportButton data={supportButtonData} />
    </Box>
  );
}
