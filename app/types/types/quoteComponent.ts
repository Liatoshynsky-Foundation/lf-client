export type Color = 'black' | 'burgundy';
export type Align = 'left' | 'right';

export type QuoteBlockProps = {
  quoteText?: string;
  sourceText?: string;
  quoteIconColor: Color;
  mainTextColor: Color;
  alignRight?: boolean;
};
