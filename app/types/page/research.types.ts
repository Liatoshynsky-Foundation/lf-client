export type Localized<T> = { [lang: string]: T };

export interface QuoteBlock {
  text: Localized<string>;
  source: Localized<string>;
}
export interface ResearchAndScientificWorkProps {
  quote: QuoteBlock;
  title: Localized<string>;
}

export interface IResearchPage {
  slug: string;
  title: string;
  status: string;
  blocks: {
    HeroSection: ResearchAndScientificWorkProps;
  };
}
