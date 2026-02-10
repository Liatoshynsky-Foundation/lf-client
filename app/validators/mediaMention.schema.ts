import { z } from 'zod';

import { MediaMentionStatus } from '~/domain/dto/mediaMention.dto';

const mediaMentionCoverImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional()
});

const mediaMentionMetaSchema = z.object({
  views: z.number().default(0)
});

export const mediaMentionSchema = z.object({
  _id: z.string(),
  url: z.string().url(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  coverImage: mediaMentionCoverImageSchema,
  status: z.nativeEnum(MediaMentionStatus),
  publishedAt: z.string().datetime().nullable().optional(),
  meta: mediaMentionMetaSchema,
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

export const mediaMentionListItemSchema = mediaMentionSchema.pick({
  _id: true,
  title: true,
  description: true,
  slug: true,
  coverImage: true,
  publishedAt: true,
  meta: true
});
