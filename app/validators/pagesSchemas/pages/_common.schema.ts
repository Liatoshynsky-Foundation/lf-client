import { Locale } from 'next-intl';
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

export const createLocalizedImageSchema = (locale: Locale) =>
  BaseImageSchema.transform((image) => ({
    src: `/api/blob-url?folderName=photos&blobName=${image.src}`,
    alt: image.alt[locale],
    caption: image.caption ? image.caption[locale] : null
  }));

export const createLocalizedQuoteSchema = (locale: Locale) =>
  QuoteSchema.transform((quote) => ({
    text: quote.text[locale],
    source: quote.source[locale]
  }));
