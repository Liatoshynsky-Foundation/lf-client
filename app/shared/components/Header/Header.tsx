'use client';
import { Box } from '@mui/material';
import React from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import Button from '~/ds-components/button/Button';
import { styles } from '~/ds-components/button-group/ButtonGroup.styles';

const btns = [
  <Button sx={styles.defaultButton} key="1" onClick={() => console.log('Button 1 clicked')}>
    Button 1
  </Button>,
  <Button sx={styles.defaultButton} key="2" onClick={() => console.log('Button 2 clicked')}>
    Button 2 Longer
  </Button>,
  <Button sx={styles.defaultButton} key="3" onClick={() => console.log('Button 3 clicked')}>
    Btn 3
  </Button>
];

const colorSettings = [
  {
    selectedButtonColor: '#FCFCFC',
    selectedButtonTextColor: '#190D03',
    groupBackgroundColor: '#FCBD28',
    buttonTextColor: '#190D03'
  }
];

export default function Header() {
  return (
    <Box component="header">
      <AudioPlayer src="sample-music.mp3" trackName="цо (авторський оркестровий варіант)" autoplay={false} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          marginTop: 2,
          flexDirection: 'column'
        }}
      >
        Default Settings: <ButtonGroup buttons={btns} />
        Custom Color Scheme: <ButtonGroup buttons={btns} colorSettings={colorSettings[0]} defaultActiveButton={0} />
        Provided selected button as prop (0 based): <ButtonGroup buttons={btns} defaultActiveButton={1} />
      </Box>
    </Box>
  );
}
