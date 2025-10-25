import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import MusicTableSection from '~/components/tables/CompositionTable/MusicTableSelection';
import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';

import MainLayout from '~/layouts/main-layout/MainLayout';

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
    <MainLayout>
      <TitleWithQuote
        quoteWidth={{ xs: '272px', sm: '316px', md: '341px', lg: '520px' }}
        title={t('title-with-quote.title')}
        quoteText={t('title-with-quote.quoteText')}
        sourceText={t('title-with-quote.sourceText')}
        color="black"
      />
      <MusicTableSection />
    </MainLayout>
  );
}
