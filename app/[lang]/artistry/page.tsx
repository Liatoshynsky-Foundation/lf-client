import { Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import MusicTableSection from './CompositionTable/MusicTableSelection';
<<<<<<< HEAD
import { Language } from '~/types/types/language';
=======
>>>>>>> cb8938f (added server actions , implemented serach by parameters)

import { getCompositions } from '~/actions/getCompositions';

export type PageProps = {
  params: { lang: string };
  searchParams?: { [key: string]: string | undefined };
};
<<<<<<< HEAD

export default async function Artistry({ params }: Readonly<Language>) {
=======
export default async function Artistry({ params, searchParams }: PageProps) {
>>>>>>> cb8938f (added server actions , implemented serach by parameters)
  const { lang } = await params;
  const searchParamaters = await searchParams;
  const search = searchParamaters?.search;
  setRequestLocale(lang as 'en' | 'uk');
  const t = await getTranslations('liatoshynskyArtistry');
  const initialData = await getCompositions(lang, search);
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1' }}>
      <TitleWithQuote
        title={t('title-with-quote.title')}
        quoteText={t('title-with-quote.quoteText')}
        sourceText={t('title-with-quote.sourceText')}
        color="black"
      />
      <MusicTableSection lang={lang} initialSearch={search} initialData={initialData} />
    </Box>
  );
}
