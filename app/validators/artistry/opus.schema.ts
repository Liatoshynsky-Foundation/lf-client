import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

export const opusSchema = z.object({
  _id: mongoObjectIdSchema,
  number: z.string(),
  title: translatedFieldSchema,
  releaseYear: z.union([z.number(), z.string()]).optional().nullable(),
  creationYear: z.union([z.number(), z.string()]).optional().nullable(),
  endYear: z.union([z.number(), z.string()]).optional().nullable(),
  status: z.string().optional().nullable(),
  genre: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});
