import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

const localizedBooleanSchema = z.object({
  uk: z.boolean().optional().default(true),
  en: z.boolean().optional().default(true)
});

export const pageSeoFields = {
  description: translatedFieldSchema.optional(),
  keywords: translatedFieldSchema.optional(),
  canonicalUrl: translatedFieldSchema.optional(),
  allowIndexation: localizedBooleanSchema.optional()
};

export const PageSeoSchema = z.object(pageSeoFields);
export type PageSeo = z.infer<typeof PageSeoSchema>;
