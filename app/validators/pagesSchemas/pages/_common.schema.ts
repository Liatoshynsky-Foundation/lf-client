import { Locale } from 'next-intl';
import { z } from 'zod';

import { requiredTranslatedTipTapSchema, translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';

const CropRectSchema = z
  .union([
    z
      .object({
        rect: z.object({
          x: z.number(),
          y: z.number(),
          width: z.number(),
          height: z.number()
        })
      })
      .transform((crop) => crop.rect),
    z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number()
    }),
    z.null()
  ])
  .optional();

const BaseImageSchema = z.object({
  src: z.string(),
  alt: translatedTipTapSchema,
  caption: translatedTipTapSchema.nullable(),
  crop: CropRectSchema
});

export const ImageSchema = BaseImageSchema.transform((image) => ({
  ...image,
  generatedSrc: image.src
}));

const BaseOptionalCaptionImageSchema = z.object({
  src: z.string(),
  alt: translatedTipTapSchema,
  caption: translatedTipTapSchema.nullable().catch(null),
  crop: CropRectSchema
});

export const OptionalCaptionImageSchema = BaseOptionalCaptionImageSchema.transform((image) => ({
  ...image,
  generatedSrc: image.src
}));

export const QuoteSchema = z.object({
  text: translatedFieldSchema,
  source: translatedFieldSchema
});

export function createTipTapQuoteSchema(locale: Locale) {
  return z.object({
    text: requiredTranslatedTipTapSchema(locale),
    source: requiredTranslatedTipTapSchema(locale)
  });
}
