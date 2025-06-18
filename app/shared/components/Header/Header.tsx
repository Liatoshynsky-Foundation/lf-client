import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import Button from '../design-system/all-components/button/Button';
import ButtonGroup from '../design-system/all-components/button-group/ButtonGroup';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import SupportButton from './SupportButton/SupportButton';

const buttons = [
  <Button key="1">Button 1</Button>,
  <Button key="2">Button 2</Button>,
  <Button key="3">Button 3</Button>,
  <Button key="4">Button 4</Button>
];

export default async function Header() {
  const t = await getTranslations('header');

  const supportButtonData = {
    text: t('supportButton'),
    link: '/support'
  };

  return (
    <Box component="header">
      <AudioPlayer
        src="/music/sample-music.mp3"
        trackName="Symphony No. 3 In B Minor, Op. 50: Iv. Allegro Risoluto"
        autoplay={false}
      />
      <SupportButton data={supportButtonData} />
      <ButtonGroup buttons={buttons} palette="primary" size="small" defaultActiveButton={0} />
    </Box>
  );
}
