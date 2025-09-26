import { Locale } from 'next-intl';

import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import { ResearchAndScientificWorkProps } from '~/types/page/research.types';

import { localizeField } from '~/lib/utils/localize';

export default function ResearchAndScientificWork({
  data,
  lang
}: {
  readonly data: ResearchAndScientificWorkProps;
  readonly lang: Locale;
}) {
  const { title, quote } = data;

  const localizedTitle = localizeField<string>(title, lang) ?? '';
  const localizedQuoteText = localizeField<string>(quote.text, lang) ?? '';
  const localizedSourceText = localizeField<string>(quote.source, lang) ?? '';

  return (
    <TitleWithQuote
      quoteBlockSx={{ width: { md: '520px' } }}
      quoteSectionSx={{
        gridColumn: {
          xs: '1 / 3',
          sm: '5 / -1',
          md: '8 / -1'
        }
      }}
      title={localizedTitle}
      quoteText={localizedQuoteText}
      sourceText={localizedSourceText}
      color="brown"
    />
  );
}
