import { Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import MusicTableSection from './CompositionTable/MusicTableSelection';
import { Language } from '~/types/types/language';

import { createRequestContainer } from '~/di/container';

export default async function Artistry({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const filter = 'Довше';
  const musicData = await createRequestContainer().resolve('artistryService').getAllCompositions(lang, filter);
  const t = await getTranslations('liatoshynskyArtistry');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1' }}>
      <TitleWithQuote
        title={t('title-with-quote.title')}
        quoteText={t('title-with-quote.quoteText')}
        sourceText={t('title-with-quote.sourceText')}
        color="black"
      />
      <MusicTableSection data={musicData} />
    </Box>
  );
}
