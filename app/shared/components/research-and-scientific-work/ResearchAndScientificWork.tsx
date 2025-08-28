import TitleWithQuote from '~/components/title-with-quote/TitleWithQuote';

import { ResearchAndScientificWorkProps } from '~/types/page/research.types';

export default function ResearchAndScientificWork({ data }: { readonly data: ResearchAndScientificWorkProps }) {
  const { title, quote } = data;

  return <TitleWithQuote title={title} quoteText={quote.text} sourceText={quote.source} color="brown" />;
}
