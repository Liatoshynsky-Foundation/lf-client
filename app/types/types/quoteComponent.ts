import { SxProps } from '@mui/material';

export type Color = 'black' | 'burgundy' | 'white';
export type Align = 'left' | 'right';

export type QuoteBlockProps = {
  quoteText?: string;
  sourceText?: string;
  quoteIconColor: Color;
  mainTextColor: Color;
  alignRight?: boolean;
  sx?: SxProps;
};
