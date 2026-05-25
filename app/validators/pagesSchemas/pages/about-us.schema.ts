import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';
import { ImageSchema, TipTapQuoteSchema } from '~/validators/pagesSchemas/pages/_common.schema';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

const IntroSectionBlockSchema = z.object({
  title: translatedTipTapSchema,
  image: ImageSchema,
  quote: TipTapQuoteSchema
});

const FoundationInfoBlockSchema = z.object({
  ourOrganisation: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  ourName: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  ourBelief: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  image: ImageSchema
});

const OurMissionBlockSchema = z.object({
  title: translatedTipTapSchema,
  smallImage: ImageSchema,
  bigImage: ImageSchema,
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }))
});

const OurGoalsBlockSchema = z.object({
  title: translatedTipTapSchema,
  goals: z.array(
    z.object({
      title: translatedTipTapSchema,
      description: translatedTipTapSchema
    })
  )
});

const LiatoshynskyOfficeBlockSchema = z.object({
  quote: TipTapQuoteSchema
});

const WhatWeDoBlockSchema = z.object({
  title: translatedTipTapSchema,
  items: z.array(
    z.object({
      title: translatedTipTapSchema,
      description: translatedTipTapSchema
    })
  )
});

const FoundationFoundersBlockSchema = z.object({
  titleText: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  listTitle: translatedTipTapSchema,
  members: z.array(
    z.object({
      photo: ImageSchema,
      name: translatedTipTapSchema,
      description: translatedTipTapSchema
    })
  )
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

export const AboutUsPageSchema = z.object({
  pageType: z.literal('AboutUsPage'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: AboutUsBlock,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
