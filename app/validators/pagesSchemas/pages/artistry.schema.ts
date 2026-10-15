import { Locale } from 'next-intl';
import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, requiredTranslatedTipTapSchema, translatedFieldSchema } from '~/validators/constants';

export function createArtistryPageSchema(locale: Locale) {
  const requiredTipTap = requiredTranslatedTipTapSchema(locale);

  const TitleWithQuoteBlockSchema = z.object({
    title: requiredTipTap,
    quoteText: requiredTipTap,
    sourceText: requiredTipTap
  });

  const MusicTableSectionBlockSchema = z.object({});

  const ArtistryBlocks = z.object({
    TitleWithQuote: TitleWithQuoteBlockSchema,
    MusicTableSection: MusicTableSectionBlockSchema
  });

  return z.object({
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
}

export const ArtistryPageSchema = createArtistryPageSchema('uk');
