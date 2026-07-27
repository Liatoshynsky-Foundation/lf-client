import { TipTapDoc } from '~/types/types/tiptap.types';

export interface ITitleWithQuote {
  title: string | TipTapDoc;
  quoteText: string | TipTapDoc;
  sourceText: string | TipTapDoc;
}

export type IMusicTableSection = Record<string, never>;
