import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import MusicTableSection from '~/components/tables/CompositionTable/MusicTableSection';
import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

import { Language } from '~/types/types/language';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

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

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout data-testid="Artistry">
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
