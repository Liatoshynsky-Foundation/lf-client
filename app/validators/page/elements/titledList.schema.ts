import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

const titledListItemSchema = z.object({
  title: translatedFieldSchema,
  description: translatedFieldSchema
});

export const titledListElementSchema = z.object({
  elementType: z.literal('TitledList'),
  items: z.array(titledListItemSchema)
});
