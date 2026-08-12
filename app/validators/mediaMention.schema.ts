import { z } from 'zod';

import { translatedFieldSchema } from './constants';

import { MediaMentionStatus } from '~/domain/dto/mediaMention.dto';

const mediaMentionCoverImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema.optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  crop: z
    .object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number()
    })
    .nullable()
    .optional()
});

const mediaMentionMetaSchema = z.object({
  views: z.number().default(0)
});

export const mediaMentionSchema = z.object({
  _id: z.string(),
  url: z.string().url(),
  title: translatedFieldSchema,
  description: translatedFieldSchema,
  slug: z.string(),
  coverImage: mediaMentionCoverImageSchema,
  status: z.nativeEnum(MediaMentionStatus),
  meta: mediaMentionMetaSchema,
  publishedAt: z.coerce
    .date()
    .nullable()
    .optional()
    .transform((date) => date?.toISOString() ?? null),
  createdAt: z.coerce
    .date()
    .optional()
    .transform((date) => date?.toISOString()),
  updatedAt: z.coerce
    .date()
    .optional()
    .transform((date) => date?.toISOString())
});

export const mediaMentionListItemSchema = mediaMentionSchema.pick({
  _id: true,
  url: true,
  title: true,
  description: true,
  slug: true,
  coverImage: true,
  publishedAt: true,
  meta: true
});
