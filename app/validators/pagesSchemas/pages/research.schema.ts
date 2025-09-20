import { Locale } from 'next-intl';
import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { translatedFieldSchema } from '~/validators/constants';
import { createLocalizedQuoteSchema, QuoteSchema } from '~/validators/pagesSchemas/pages/_common.schema';

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
  _id: z.any().optional()
});

export const createLocalizedResearchPageSchema = (locale: Locale) =>
  ResearchPageSchema.transform((page) => {
    const { blocks } = page;
    return {
      slug: page.slug,
      title: page.title[locale],
      status: page.status,
      blocks: {
        HeroSection: {
          quote: createLocalizedQuoteSchema(locale).parse(blocks.HeroSection.quote),
          title: blocks.HeroSection.title[locale]
        }
      }
    };
  });
