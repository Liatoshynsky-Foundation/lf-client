export type Color = 'black' | 'burgundy';
export type Align = 'left' | 'right';

export type SourceTextItem = {
  title?: string;
  data?: string;
  place?: string;
};

export type QuoteBlockProps = {
  quoteText?: string;
  sourceText?: SourceTextItem;
  quoteIconColor: Color;
  mainTextColor: Color;
  alignRight?: boolean;
};

export type StylesProps = {
  quoteIconColor?: Color;
  mainTextColor?: Color;
  alignRight?: boolean;
};
