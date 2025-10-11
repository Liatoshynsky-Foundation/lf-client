import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

export const namedFilterSchema = z.object({
  _id: mongoObjectIdSchema,
  key: z.string(),
  name: translatedFieldSchema
});
