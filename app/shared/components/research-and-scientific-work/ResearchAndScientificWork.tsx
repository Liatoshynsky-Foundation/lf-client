import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import { ResearchAndScientificWorkProps } from '~/types/page/research.types';

export default function ResearchAndScientificWork({ data }: { readonly data: ResearchAndScientificWorkProps }) {
  const { title, quote } = data;

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
      title={title}
      quoteText={quote.text}
      sourceText={quote.source}
      color="brown"
    />
  );
}
