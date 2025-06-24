import { getTranslations } from 'next-intl/server';
import React from 'react';

import TitleWithQuote from '~/shared/components/title-with-quote/TitleWithQuote';

export default async function Work() {
  const t = await getTranslations('liatoshynskyWork');

  return (
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
  );
}
