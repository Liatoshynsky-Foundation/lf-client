import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { musicData } from './CompositionTable/MusicTable.constant';
import MusicTableSection from './CompositionTable/MusicTableSelection';

import TitleWithQuote from '~/shared/components/title-with-quote/TitleWithQuote';

export default async function Artistry() {
  const t = await getTranslations('liatoshynskyArtistry');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1' }}>
      <TitleWithQuote
        title={t('title-with-quote.title')}
        quoteText={t('title-with-quote.quoteText')}
        sourceText={{
          title: t('title-with-quote.sourceText.title'),
          data: t('title-with-quote.sourceText.data'),
          place: t('title-with-quote.sourceText.place')
        }}
        color="black"
      />
      <MusicTableSection data={musicData} />
    </Box>
  );
}
