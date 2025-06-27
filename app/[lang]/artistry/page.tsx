import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import React from 'react';
import MusicTableSection from './CompositionTable/MusicTableSelection';
import { compositionService } from '~/middleware/composition.service';
import TitleWithQuote from "~/components/title-with-quote/TitleWithQuote";

export default async function Artistry() {
  const locale = await getLocale();
    const t = await getTranslations('liatoshynskyArtistry');

    const musicData = await compositionService.getDataForArtistryTable(locale);

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
