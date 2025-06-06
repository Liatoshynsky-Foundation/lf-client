import { z } from 'zod';
import { translatedFieldSchema, translatedLinkSchema } from '~/validators/constants';

export const navigationLinkSchema = translatedLinkSchema.extend({
  visibility: z.enum(['true', 'false'])
});

export const navigationSchema = z.object({
  title: translatedFieldSchema,
  links: z.array(navigationLinkSchema)
});
