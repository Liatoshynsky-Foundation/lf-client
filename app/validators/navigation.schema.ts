import type { Locale } from 'next-intl';
import { z } from 'zod';

import { translatedFieldSchema, translatedLinkSchema } from './constants';

export const navigationLinkSchema = translatedLinkSchema.extend({
  visibility: z.boolean()
});

export const navigationSchema = z.object({
  title: translatedFieldSchema,
  links: z.array(navigationLinkSchema),
  footerOrder: z.number().nullable().optional()
});

export function LocalizeSchemaWithSingleLink(locale: Locale) {
  return navigationSchema.transform((data) => {
    const localizedData = {
      ...data,
      title: data.title[locale],
      links: data.links?.map((link) => ({
        ...link,
        label: link.label[locale]
      }))
    };

    if (localizedData.links?.length === 1) {
      const [singleLink] = localizedData.links;
      return {
        ...localizedData,
        title: singleLink.label,
        links: [
          {
            ...singleLink,
            label: localizedData.title
          }
        ]
      };
    }

    return localizedData;
  });
}
