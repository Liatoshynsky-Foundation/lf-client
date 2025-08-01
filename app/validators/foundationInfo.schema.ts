import type { Locale } from 'next-intl';
import { z } from 'zod';

import { hrefSchema, translatedFieldSchema, translatedLinkSchema } from './constants';

export const brandingInfoSchema = z.object({
  foundationName: translatedFieldSchema,
  supportButtonLink: hrefSchema.optional()
});

export const contactInfoSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: translatedFieldSchema,
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

export const createLocalizedContactInfoSchema = (locale: Locale) =>
  contactInfoSchema.transform((data) => ({
    address: data.address[locale]
  }));

export const createLocalizedBrandingInfoSchema = (locale: Locale) =>
  brandingInfoSchema.omit({ supportButtonLink: true }).transform((data) => ({
    foundationName: data.foundationName[locale]
  }));

export const createLocalizedPublicInfoSchema = (locale: Locale) =>
  publicInfoSchema.transform((data) => ({
    copyright: data.copyright[locale],
    links:
      data.links?.map((link) => ({
        label: link.label[locale],
        href: link.href
      })) ?? []
  }));
