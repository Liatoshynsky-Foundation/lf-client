import { z } from 'zod';

import { translatedFieldSchema } from './constants';

import { NewsStatus } from '~/domain/dto/news.dto';

export const cropRectSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number()
});

export type CropRect = z.infer<typeof cropRectSchema>;

export const newsImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema,
  caption: translatedFieldSchema,
  isTmp: z.boolean(),
  crop: cropRectSchema.nullable().optional()
});

export const mongoObjectIdSchema = z
  .union([
    z.string().regex(/^[0-9a-fA-F]{24}$/),
    z.custom((val) => val != null && typeof val === 'object' && 'toString' in val)
  ])
  .transform((val) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object' && 'toString' in val) {
      return val.toString();
    }
    return String(val);
  });

export const newsSchema = z.object({
  _id: mongoObjectIdSchema,
  publishedAt: z.coerce
    .date()
    .nullable()
    .catch(null)
    .transform((date) => date?.toISOString() ?? null),
  newsDate: z.coerce
    .date()
    .nullable()
    .catch(null)
    .transform((date) => date?.toISOString() ?? null),
  title: translatedFieldSchema,
  description: translatedFieldSchema,
  content: z.object({
    uk: z.record(z.any()),
    en: z.record(z.any())
  }),
  slug: z.string(),
  coverImage: newsImageSchema,
  status: z.nativeEnum(NewsStatus),
  meta: z.object({
    views: z.number()
  }),
  createdAt: z.coerce
    .date()
    .optional()
    .transform((date) => date?.toISOString()),
  updatedAt: z.coerce
    .date()
    .optional()
    .transform((date) => date?.toISOString())
});

export const newsListItemSchema = newsSchema.pick({
  _id: true,
  publishedAt: true,
  newsDate: true,
  title: true,
  description: true,
  slug: true,
  coverImage: true,
  meta: true
});
