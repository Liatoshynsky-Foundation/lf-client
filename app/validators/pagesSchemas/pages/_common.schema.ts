import { z } from 'zod';

import { translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';

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
  generatedSrc: image.src.startsWith('http') ? image.src : `/api/blob-url?folderName=photos&blobName=${image.src}`
}));

export const QuoteSchema = z.object({
  text: translatedFieldSchema,
  source: translatedFieldSchema
});

export const TipTapQuoteSchema = z.object({
  text: translatedTipTapSchema,
  source: translatedTipTapSchema
});
