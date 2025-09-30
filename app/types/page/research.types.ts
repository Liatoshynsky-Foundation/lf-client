export interface QuoteBlock {
  text: string;
  source: string;
}
export interface ResearchAndScientificWorkProps {
  quote: QuoteBlock;
  title: string;
}

export interface IResearchPage {
  slug: string;
  title: string;
  status: string;
  blocks: {
    HeroSection: ResearchAndScientificWorkProps;
  };
}
