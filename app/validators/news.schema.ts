import { z } from 'zod';

import { translatedFieldSchema } from './constants';

import { NewsStatus } from '~/domain/dto/news.dto';

export const newsImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema,
  caption: translatedFieldSchema,
  isTmp: z.boolean()
});

export const mongoObjectIdSchema = z.union([
  z.string().regex(/^[0-9a-fA-F]{24}$/),
  z.custom((val) => val != null && typeof val === 'object' && 'toString' in val)
]);

export const newsSchema = z.object({
  _id: mongoObjectIdSchema,
  publishedAt: z.coerce.date().nullable(),
  newsDate: z.coerce.date().nullable(),
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
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
