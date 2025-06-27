import { z } from 'zod';

import { zTranslatedFieldSchema } from '~/validators/translation.schema';

export const zOpusDTOSchema = z.object({
  _id: z.string(),
  number: z.string(),
  title: zTranslatedFieldSchema,
  createdAt: z.date(),
  updatedAt: z.date()
});
