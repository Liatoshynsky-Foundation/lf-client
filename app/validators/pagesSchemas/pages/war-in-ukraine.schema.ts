import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import {
  carouselImageSchema as CarouselImageSchema,
  mongoObjectIdSchema,
  translatedFieldSchema,
  translatedTipTapSchema
} from '~/validators/constants';

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
    description: translatedTipTapSchema
  }),
  PrincipleOfHope: z.object({
    hidden: z.boolean().optional(),
    buttonText: translatedFieldSchema,
    buttonLink: z.string().optional().or(z.literal('')),
    description: translatedTipTapSchema,
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
    description: translatedTipTapSchema,
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

export const WarInUkrainePageSchema = z.object({
  pageType: z.literal('WarInUkrainePage'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: WarInUkraineBlocks,
  blocksOrder: z.array(z.string()).min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
