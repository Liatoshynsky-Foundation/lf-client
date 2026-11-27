import { z } from 'zod';

import { hrefSchema, translatedFieldSchema, translatedLinkSchema } from './constants';

const normalizeOptionalContactValue = (value: unknown) =>
  value === null || (typeof value === 'string' && !value.trim()) ? undefined : value;

const optionalContactStringSchema = z.preprocess(normalizeOptionalContactValue, z.string().optional());
const optionalEmailSchema = z.preprocess(normalizeOptionalContactValue, z.string().email().optional());

const optionalTranslatedContactFieldSchema = z.preprocess(
  (value) => (value === null ? undefined : value),
  z
    .object({
      uk: optionalContactStringSchema,
      en: optionalContactStringSchema
    })
    .transform(({ uk, en }) => ({ uk, en }))
    .optional()
);

export const brandingInfoSchema = z.object({
  foundationName: optionalTranslatedContactFieldSchema,
  supportButtonLink: hrefSchema.optional()
});

export const contactInfoSchema = z.object({
  email: optionalEmailSchema,
  phone: optionalContactStringSchema,
  address: optionalTranslatedContactFieldSchema,
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
