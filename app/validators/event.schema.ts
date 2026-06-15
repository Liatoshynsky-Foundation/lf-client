import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from './constants';

import { EventStatus } from '~/domain/dto/event.dto';

const eventImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema,
  caption: translatedFieldSchema,
  isTmp: z.boolean()
});

export const eventSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema,
  description: translatedFieldSchema,
  content: z.object({
    uk: z.record(z.any()),
    en: z.record(z.any())
  }),
  slug: z.string(),
  coverImage: eventImageSchema,
  status: z.nativeEnum(EventStatus),
  meta: z.object({
    views: z.number()
  }),
  publishedAt: z.coerce
    .date()
    .nullable()
    .transform((date) => date?.toISOString() ?? null),
  eventLink: z.string(),
  eventDateTimeStart: z.coerce
    .date()
    .nullable()
    .optional()
    .transform((date) => date?.toISOString() ?? null),
  eventDateTimeEnd: z.coerce
    .date()
    .nullable()
    .optional()
    .transform((date) => date?.toISOString() ?? null),
  ticketUrl: z
    .object({
      uk: z.string().nullable(),
      en: z.string().nullable()
    })
    .nullable()
    .optional(),
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
  title: true,
  description: true,
  slug: true,
  coverImage: true,
  meta: true,
  eventDateTimeStart: true,
  eventDateTimeEnd: true
});
