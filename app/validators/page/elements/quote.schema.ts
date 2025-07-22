import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

export const quoteElementSchema = z.object({
  elementType: z.literal('Quote'),
  text: translatedFieldSchema,
  author: translatedFieldSchema
});
