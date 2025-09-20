import { Locale } from 'next-intl';
import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { translatedFieldSchema } from '~/validators/constants';
import {
  createLocalizedImageSchema,
  createLocalizedQuoteSchema,
  ImageSchema,
  QuoteSchema
} from '~/validators/pagesSchemas/pages/_common.schema';
import { TipTapContentSchema } from '~/validators/pagesSchemas/tiptap.schema';

const IntroSectionBlockSchema = z.object({
  title: translatedFieldSchema,
  image: ImageSchema,
  quote: QuoteSchema
});

const FoundationInfoBlockSchema = z.object({
  ourOrganisation: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  ourName: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  ourBelief: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  image: ImageSchema
});

const OurMissionBlockSchema = z.object({
  title: translatedFieldSchema,
  smallImage: ImageSchema,
  bigImage: ImageSchema,
  list: z.array(z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }))
});

const OurGoalsBlockSchema = z.object({
  title: translatedFieldSchema,
  goals: z.array(
    z.object({
      title: translatedFieldSchema,
      description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
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
      description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
    })
  )
});

const FoundationFoundersBlockSchema = z.object({
  titleText: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
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
  _id: z.any().optional()
});

export const createLocalizedAboutUsPageSchema = (locale: Locale) =>
  AboutUsPageSchema.transform((page) => {
    const { blocks } = page;
    return {
      slug: page.slug,
      title: page.title[locale],
      status: page.status,
      blocks: {
        IntroSection: {
          title: blocks.IntroSection.title[locale],
          image: createLocalizedImageSchema(locale).parse(blocks.IntroSection.image),
          quote: createLocalizedQuoteSchema(locale).parse(blocks.IntroSection.quote)
        },
        FoundationInfo: {
          ourOrganisation: blocks.FoundationInfo.ourOrganisation[locale],
          ourName: blocks.FoundationInfo.ourName[locale],
          ourBelief: blocks.FoundationInfo.ourBelief[locale],
          image: createLocalizedImageSchema(locale).parse(blocks.FoundationInfo.image)
        },
        OurMission: {
          title: blocks.OurMission.title[locale],
          smallImage: createLocalizedImageSchema(locale).parse(blocks.OurMission.smallImage),
          bigImage: createLocalizedImageSchema(locale).parse(blocks.OurMission.bigImage),
          list: blocks.OurMission.list.map((item) => item[locale])
        },
        OurGoals: {
          title: blocks.OurGoals.title[locale],
          goals: blocks.OurGoals.goals.map((goal) => ({
            title: goal.title[locale],
            description: goal.description[locale]
          }))
        },
        LiatoshynskyOffice: {
          quote: createLocalizedQuoteSchema(locale).parse(blocks.LiatoshynskyOffice.quote)
        },
        WhatWeDo: {
          title: blocks.WhatWeDo.title[locale],
          items: blocks.WhatWeDo.items.map((item) => ({
            title: item.title[locale],
            description: item.description[locale]
          }))
        },
        FoundationFounders: {
          titleText: blocks.FoundationFounders.titleText[locale],
          listTitle: blocks.FoundationFounders.listTitle[locale],
          members: blocks.FoundationFounders.members.map((member) => ({
            photo: createLocalizedImageSchema(locale).parse(member.photo),
            name: member.name[locale],
            description: member.description[locale]
          }))
        }
      }
    };
  });
