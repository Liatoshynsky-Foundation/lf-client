import { getTranslations } from 'next-intl/server';

import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

const LiatoshynskyWork = async () => {
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
};

export default LiatoshynskyWork;
