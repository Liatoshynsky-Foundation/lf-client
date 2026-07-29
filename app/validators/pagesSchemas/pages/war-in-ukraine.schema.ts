import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';

const ButtonItemSchema = z.object({
  shortText: translatedFieldSchema,
  fullText: translatedFieldSchema,
  link: z.string().optional().or(z.literal(''))
});

const PaymentMethodSchema = z.object({
  label: translatedFieldSchema,
  value: z.string()
});

const CropSchema = z
  .object({
    rect: z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number()
    })
  })
  .nullable()
  .optional();

const CarouselImageSchema = z.object({
  id: z.string().optional(),
  src: z.string(),
  generatedSrc: z.string().optional(),
  alt: translatedFieldSchema,
  caption: translatedFieldSchema.optional(),
  crop: CropSchema
});

const WarInUkraineBlocks = z.object({
  WarInfo: z.object({
    title: translatedFieldSchema.optional(),
    description: translatedTipTapSchema
  }),
  PrincipleOfHope: z.object({
    buttonText: translatedFieldSchema,
    buttonLink: z.string().optional().or(z.literal('')),
    description: translatedTipTapSchema,
    buttons: z.array(ButtonItemSchema)
  }),
  WarCarousel: z
    .object({
      images: z.array(CarouselImageSchema).optional()
    })
    .optional(),
  YermolenkoLinks: z.object({
    buttonText: translatedFieldSchema,
    description: translatedTipTapSchema,
    buttons: z.array(ButtonItemSchema)
  }),
  VolunteerDonation: z.object({
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
