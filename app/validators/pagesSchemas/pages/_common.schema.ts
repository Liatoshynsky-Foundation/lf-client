import { z } from 'zod';

import { translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';

const BaseImageSchema = z.object({
  src: z.string(),
  alt: translatedTipTapSchema,
  caption: translatedTipTapSchema.nullable()
});

export const ImageSchema = BaseImageSchema.transform((image) => ({
  ...image,
  generatedSrc: `/api/blob-url?folderName=photos&blobName=${image.src}`
}));

export const QuoteSchema = z.object({
  text: translatedFieldSchema,
  source: translatedFieldSchema
});

export const TipTapQuoteSchema = z.object({
  text: translatedTipTapSchema,
  source: translatedTipTapSchema
});
