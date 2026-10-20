import { z } from 'zod';

import { MANAGED_PAGE_SECTION_ITEM_TYPE, MANAGED_PAGE_SECTION_KIND } from '~/types/page/managed-page-section.types';

import { translatedTipTapSchema } from '~/validators/constants';

export const ManagedPageSectionItemSchema = z.object({
  id: z.string(),
  type: z.enum([
    MANAGED_PAGE_SECTION_ITEM_TYPE.SUBTITLE,
    MANAGED_PAGE_SECTION_ITEM_TYPE.PARAGRAPH,
    MANAGED_PAGE_SECTION_ITEM_TYPE.BULLET
  ]),
  value: translatedTipTapSchema
});

export const ManagedPageSectionBlockSchema = z.object({
  kind: z.literal(MANAGED_PAGE_SECTION_KIND),
  title: translatedTipTapSchema,
  items: z.array(ManagedPageSectionItemSchema).default([]),
  hidden: z.boolean().optional()
});

export const withManagedPageSections = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => schema.passthrough();
