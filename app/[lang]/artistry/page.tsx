import { Box } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import MusicTableSection from '~/shared/components/tables/CompositionTable/MusicTableSelection';

export const metadata = createSeoMeta({
  title: 'Творчість - Фундація Лятошинського',
  description: 'Ознайомтесь з творчістю Бориса Лятошинського.',
  url: '/artistry'
});

export default async function Artistry({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations('liatoshynskyArtistry');
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1', overflow: 'visible' }}>
      <TitleWithQuote
        title={t('title-with-quote.title')}
        quoteText={t('title-with-quote.quoteText')}
        sourceText={t('title-with-quote.sourceText')}
        color="black"
      />
      <MusicTableSection />
    </Box>
  );
}
