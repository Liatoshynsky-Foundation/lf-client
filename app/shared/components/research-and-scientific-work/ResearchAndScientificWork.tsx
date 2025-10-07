import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import { ResearchAndScientificWorkProps } from '~/types/page/research.types';

export default function ResearchAndScientificWork({ data }: { readonly data: ResearchAndScientificWorkProps }) {
  const { title, quote } = data;

  return (
    <TitleWithQuote
      quoteWidth={{ xs: '272px', sm: '316px', md: '421px', lg: '520px' }}
      title={title}
      quoteText={quote.text}
      sourceText={quote.source}
      color="black"
    />
  );
}
