import { getTranslations } from 'next-intl/server';

import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

const ResearchAndScientificWork = async () => {
  const t = await getTranslations('research');
  return (
    <TitleWithQuote
      title={t('title-with-quote.title')}
      quoteText={t('title-with-quote.quoteText')}
      sourceText={t('title-with-quote.sourceText')}
      color="brown"
    />
  );
};
export default ResearchAndScientificWork;
