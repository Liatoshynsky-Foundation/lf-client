import { z } from 'zod';
import { hrefSchema, translatedFieldSchema, translatedLinkSchema } from './constants';

export const brandingInfoSchema = z.object({
  foundationName: translatedFieldSchema,
  supportButtonLink: hrefSchema.optional()
});

export const contactInfoSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  contactButtonLink: hrefSchema.optional()
});

export const publicInfoSchema = z.object({
  copyright: translatedFieldSchema,
  links: z.array(translatedLinkSchema).optional()
});
