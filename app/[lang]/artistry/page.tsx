import { Box } from '@mui/material';
import React from 'react';

import { musicData } from './CompositionTable/MusicTable.constant';
import MusicTableSection from './CompositionTable/MusicTableSelection';

export default async function Artistry() {
  return (
    <Box sx={{ gridColumn: '1 / -1' }}>
      <MusicTableSection data={musicData} />
    </Box>
  );
}
