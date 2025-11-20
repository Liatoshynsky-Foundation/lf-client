import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

const BaseImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema,
  caption: translatedFieldSchema.nullable()
});

export const ImageSchema = BaseImageSchema.transform((image) => ({
  ...image,
  generatedSrc: `/api/blob-url?folderName=photos&blobName=${image.src}`
}));

export const QuoteSchema = z.object({
  text: translatedFieldSchema,
  source: translatedFieldSchema
});
