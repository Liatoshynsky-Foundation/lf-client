import { Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import MusicTableSection from './CompositionTable/MusicTableSelection';
import { ParamsWithLanguage } from '~/types/types/paramsWithLanguage';

import { createRequestContainer } from '~/di/container';

export default async function Artistry({ params }: Readonly<ParamsWithLanguage>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const musicData = await createRequestContainer().resolve('artistryService').getAllCompositions(lang);

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
