import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';

const TitleWithQuoteBlockSchema = z.object({
  title: translatedTipTapSchema,
  quoteText: translatedTipTapSchema,
  sourceText: translatedTipTapSchema
});

const MusicTableSectionBlockSchema = z.object({});

const ArtistryBlocks = z.object({
  TitleWithQuote: TitleWithQuoteBlockSchema,
  MusicTableSection: MusicTableSectionBlockSchema
});

export const ArtistryPageSchema = z.object({
  pageType: z.literal('ArtistryPage'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: ArtistryBlocks,
  blocksOrder: z.array(z.string()).min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
