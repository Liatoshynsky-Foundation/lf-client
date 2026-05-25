import { SxProps } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';

import { TipTapDoc } from './tiptap.types';

export type Color = 'black' | 'burgundy' | 'white';
export type Align = 'left' | 'right';

export type QuoteBlockProps = {
  quoteText?: string | TipTapDoc;
  sourceText?: string | TipTapDoc;
  quoteIconColor: Color;
  mainTextColor: Color;
  alignRight?: boolean;
  sx?: SxProps;
  width?: string | Record<string, string>;
  imageTextGap?: ResponsiveStyleValue<number | string> | null;
  textGap?: ResponsiveStyleValue<number | string> | null;
  iconWidth?: ResponsiveStyleValue<number | string> | null;
  dataTestId?: string;
};
