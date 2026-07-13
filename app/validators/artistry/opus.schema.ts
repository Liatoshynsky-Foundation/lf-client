import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

export const opusSchema = z.object({
  _id: mongoObjectIdSchema,
  number: z.string(),
  title: translatedFieldSchema,
  releaseYear: z.number().optional(),
  youtubeUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
