import { z } from 'zod';

import { hrefSchema, translatedFieldSchema, translatedLinkSchema } from './constants';

export const brandingInfoSchema = z.object({
  foundationName: translatedFieldSchema,
  supportButtonLink: hrefSchema.optional()
});

export const contactInfoSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        platform: z.string(),
        link: z.string().url(),
        icon: z.string()
      })
    )
    .optional()
});

export const publicInfoSchema = z.object({
  copyright: translatedFieldSchema,
  links: z.array(translatedLinkSchema).optional()
});
