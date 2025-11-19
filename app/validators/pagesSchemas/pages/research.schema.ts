import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';
import { QuoteSchema } from '~/validators/pagesSchemas/pages/_common.schema';

const ResearchHeroSectionBlockSchema = z.object({
  quote: QuoteSchema,
  title: translatedFieldSchema
});

const ResearchBlocksSchema = z.object({
  HeroSection: ResearchHeroSectionBlockSchema
});

export const ResearchPageSchema = z.object({
  pageType: z.literal('Research'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: ResearchBlocksSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
