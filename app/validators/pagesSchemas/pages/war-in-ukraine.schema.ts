import { Locale } from 'next-intl';
import { z } from 'zod';

import { pageSeoFields } from './seo.schema';
import { PageStatus } from '~/types/enums/common.enums';

import {
  carouselImageSchema as CarouselImageSchema,
  mongoObjectIdSchema,
  requiredTranslatedTipTapSchema,
  translatedFieldSchema
} from '~/validators/constants';

export function createWarInUkrainePageSchema(locale: Locale) {
  const requiredTipTap = requiredTranslatedTipTapSchema(locale);

  const ButtonItemSchema = z.object({
    shortText: translatedFieldSchema,
    fullText: translatedFieldSchema,
    link: z.string().optional().or(z.literal(''))
  });

  const PaymentMethodSchema = z.object({
    label: translatedFieldSchema,
    value: z.string()
  });

  const WarInUkraineBlocks = z.object({
    WarInfo: z.object({
      hidden: z.boolean().optional(),
      title: translatedFieldSchema.optional(),
      description: requiredTipTap
    }),
    PrincipleOfHope: z.object({
      hidden: z.boolean().optional(),
      buttonText: translatedFieldSchema,
      buttonLink: z.string().optional().or(z.literal('')),
      description: requiredTipTap,
      buttons: z.array(ButtonItemSchema)
    }),
    WarCarousel: z
      .object({
        hidden: z.boolean().optional(),
        images: z.array(CarouselImageSchema).optional()
      })
      .optional(),
    YermolenkoLinks: z.object({
      hidden: z.boolean().optional(),
      buttonText: translatedFieldSchema,
      description: requiredTipTap,
      buttons: z.array(ButtonItemSchema)
    }),
    VolunteerDonation: z.object({
      hidden: z.boolean().optional(),
      title: translatedFieldSchema,
      imageSrc: z.string(),
      caption: translatedFieldSchema,
      paymentMethods: z.array(PaymentMethodSchema)
    })
  });

  return z.object({
    pageType: z.literal('WarInUkrainePage'),
    slug: z.string(),
    title: translatedFieldSchema,
    status: z.nativeEnum(PageStatus),
    blocks: WarInUkraineBlocks,
    blocksOrder: z.array(z.string()).min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    _id: mongoObjectIdSchema,
    ...pageSeoFields
  });
}

export const WarInUkrainePageSchema = createWarInUkrainePageSchema('uk');
