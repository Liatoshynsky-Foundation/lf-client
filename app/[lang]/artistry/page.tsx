import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import MusicTableSection from './CompositionTable/MusicTableSelection';
import { ParamsWithLanguage } from '~/types/types/paramsWithLanguage';
import { compositionService } from '~/middleware/composition.service';
import TitleWithQuote from "~/components/title-with-quote/TitleWithQuote";


export default async function Artistry({ params }: Readonly<ParamsWithLanguage>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const musicData = await compositionService.getDataForArtistryTable(lang);
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
