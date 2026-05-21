import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from './constants';

import { EventStatus } from '~/domain/dto/events.dto';

export const eventImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema,
  caption: translatedFieldSchema,
  isTmp: z.boolean()
});

export const eventSchema = z.object({
  _id: mongoObjectIdSchema,
  slug: z.string(),
  status: z.nativeEnum(EventStatus),

  publishedAt: z.coerce
    .date()
    .nullable()
    .transform((date) => date?.toISOString() ?? null),
  eventDateTimeStart: z.coerce
    .date()
    .nullable()
    .transform((date) => date?.toISOString() ?? null),
  eventDateTimeEnd: z.coerce
    .date()
    .nullable()
    .transform((date) => date?.toISOString() ?? null),

  title: translatedFieldSchema,
  description: translatedFieldSchema,

  content: z.object({
    uk: z.record(z.any()),
    en: z.record(z.any())
  }),

  coverImage: eventImageSchema,

  meta: z.object({
    views: z.number().default(0)
  }),

  eventLink: z.string().optional().nullable(),
  ticketUrl: z.record(z.any()).optional().nullable(),
  keywords: z.record(z.any()).optional().nullable(),
  allowIndexation: z.record(z.any()).optional().nullable(),

  createdAt: z.coerce
    .date()
    .optional()
    .transform((date) => date?.toISOString()),
  updatedAt: z.coerce
    .date()
    .optional()
    .transform((date) => date?.toISOString())
});

export const eventListItemSchema = eventSchema.pick({
  _id: true,
  slug: true,
  status: true,
  publishedAt: true,
  eventDateTimeStart: true,
  eventDateTimeEnd: true,
  title: true,
  description: true,
  coverImage: true,
  meta: true,
  ticketUrl: true
});
