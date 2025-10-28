import { Box, Typography } from '@mui/material';
import React from 'react';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import TranslationNotFound from '~/shared/components/blocks/translation-not-found/TranslationNotFound';

export const metadata = createSeoMeta({
  title: 'Liatoshynsky Foundation during War in Ukraine',
  description: '',
  url: '/war-in-ukraine'
});

export default function WarInUkraine() {
  return (
    <Box sx={{ gridColumn: '1 / -1', textAlign: 'center' }}>
      <Typography variant="h1">War in Ukraine</Typography>
      <TranslationNotFound />
    </Box>
  );
}
