import { Locale } from 'next-intl';
import { z } from 'zod';

import { pageSeoFields } from './seo.schema';
import { PageStatus } from '~/types/enums/common.enums';

import {
  localizedTipTapDocSchema,
  mongoObjectIdSchema,
  requiredLocalizedTipTapDocSchema,
  requiredTranslatedTipTapSchema,
  translatedFieldSchema,
  translatedTipTapSchema
} from '~/validators/constants';
import {
  createTipTapQuoteSchema,
  ImageSchema,
  OptionalCaptionImageSchema
} from '~/validators/pagesSchemas/pages/_common.schema';

export function createAboutUsPageSchema(locale: Locale) {
  const requiredTipTap = requiredTranslatedTipTapSchema(locale);
  const requiredTipTapDoc = requiredLocalizedTipTapDocSchema(locale);

  const IntroSectionBlockSchema = z.object({
    title: requiredTipTap,
    image: ImageSchema,
    quote: createTipTapQuoteSchema(locale)
  });

  const FoundationInfoBlockSchema = z.object({
    title: translatedTipTapSchema.optional(),
    ourOrganisation: requiredTipTapDoc,
    ourName: requiredTipTapDoc,
    ourBelief: requiredTipTapDoc,
    image: ImageSchema,
    hidden: z.boolean().optional()
  });

  const OurMissionBlockSchema = z.object({
    title: requiredTipTap,
    smallImage: ImageSchema,
    bigImage: ImageSchema,
    list: z.array(localizedTipTapDocSchema),
    hidden: z.boolean().optional()
  });

  const OurGoalsBlockSchema = z.object({
    title: requiredTipTap,
    goals: z.array(
      z.object({
        title: requiredTipTap,
        description: requiredTipTap
      })
    ),
    hidden: z.boolean().optional()
  });

  const LiatoshynskyOfficeBlockSchema = z.object({
    quote: createTipTapQuoteSchema(locale),
    hidden: z.boolean().optional()
  });

  const WhatWeDoBlockSchema = z.object({
    title: requiredTipTap,
    items: z.array(
      z.object({
        title: requiredTipTap,
        description: requiredTipTap
      })
    ),
    hidden: z.boolean().optional()
  });

  const FoundationFoundersBlockSchema = z.object({
    titleText: requiredTipTapDoc,
    listTitle: requiredTipTap,
    members: z.array(
      z.object({
        photo: OptionalCaptionImageSchema,
        name: translatedTipTapSchema,
        description: translatedTipTapSchema
      })
    ),
    hidden: z.boolean().optional()
  });

  const AboutUsBlock = z.object({
    IntroSection: IntroSectionBlockSchema,
    FoundationInfo: FoundationInfoBlockSchema,
    OurMission: OurMissionBlockSchema,
    OurGoals: OurGoalsBlockSchema,
    LiatoshynskyOffice: LiatoshynskyOfficeBlockSchema,
    WhatWeDo: WhatWeDoBlockSchema,
    FoundationFounders: FoundationFoundersBlockSchema
  });

  return z.object({
    pageType: z.literal('AboutUsPage'),
    slug: z.string(),
    title: translatedFieldSchema,
    status: z.nativeEnum(PageStatus),
    blocks: AboutUsBlock,
    blocksOrder: z.array(z.string()).min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    _id: mongoObjectIdSchema,
    ...pageSeoFields
  });
}

export const AboutUsPageSchema = createAboutUsPageSchema('uk');
