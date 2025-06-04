import { Box } from '@mui/material';
import React from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import ButtonGroup from '~/shared/components/design-system/all-components/button-group/ButtonGroup';

export default function Header() {
  return (
    <Box component="header">
      <AudioPlayer src="sample-music.mp3" trackName="цо (авторський оркестровий варіант)" autoplay={false} />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <ButtonGroup buttons={['Pause', 'Stop', 'Next', 'Previous']} />
      </Box>
    </Box>
  );
}
