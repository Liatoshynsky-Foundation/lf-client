import type { Locale } from 'next-intl';
import { z } from 'zod';

import { translatedFieldSchema, translatedLinkSchema } from './constants';

export const navigationLinkSchema = translatedLinkSchema.extend({
  visibility: z.boolean()
});

export const navigationSchema = z.object({
  title: translatedFieldSchema,
  links: z.array(navigationLinkSchema)
});

export const createLocalizedNavigationSchema = (locale: Locale) =>
  navigationSchema.transform((data) => ({
    title: data.title[locale],
    links: data.links.map((link) => ({
      label: link.label[locale],
      href: link.href,
      visibility: link.visibility
    }))
  }));
