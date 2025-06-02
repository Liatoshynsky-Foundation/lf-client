'use client';

import { Box } from '@mui/material';
import React from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import { Chip } from '~/shared/components/design-system/all-components/chip/Chip';
import { FilterSelect } from '../design-system/all-components/selector/FilterSelect';

export default function Header() {
  return (
    <Box component="header">
      <AudioPlayer src="sample-music.mp3" trackName="цо (авторський оркестровий варіант)" autoplay={false} />
      <Chip label="4 обрано" variant="filled" />
      <FilterSelect
        label="Категорії"
        variant="outlined"
        options={[
          { value: '1', label: 'one' },
          { value: '2', label: 'two' },
          { value: '3', label: 'three' }
        ]}
      />
    </Box>
  );
}
