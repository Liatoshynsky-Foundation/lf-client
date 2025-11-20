import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';
import { ImageSchema, QuoteSchema } from '~/validators/pagesSchemas/pages/_common.schema';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

const IntroSectionBlockSchema = z.object({
  title: translatedFieldSchema,
  image: ImageSchema,
  quote: QuoteSchema
});

const FoundationInfoBlockSchema = z.object({
  ourOrganisation: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  ourName: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  ourBelief: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  image: ImageSchema
});

const OurMissionBlockSchema = z.object({
  title: translatedFieldSchema,
  smallImage: ImageSchema,
  bigImage: ImageSchema,
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }))
});

const OurGoalsBlockSchema = z.object({
  title: translatedFieldSchema,
  goals: z.array(
    z.object({
      title: translatedFieldSchema,
      description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
    })
  )
});

const LiatoshynskyOfficeBlockSchema = z.object({
  quote: QuoteSchema
});

const WhatWeDoBlockSchema = z.object({
  title: translatedFieldSchema,
  items: z.array(
    z.object({
      title: translatedFieldSchema,
      description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
    })
  )
});

const FoundationFoundersBlockSchema = z.object({
  titleText: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  listTitle: translatedFieldSchema,
  members: z.array(
    z.object({
      photo: ImageSchema,
      name: translatedFieldSchema,
      description: translatedFieldSchema
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
