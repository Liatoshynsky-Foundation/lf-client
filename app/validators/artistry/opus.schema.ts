import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

export const opusSchema = z.object({
  _id: z.union([z.instanceof(ObjectId).transform((id) => id.toString()), z.string()]),
  number: z.string(),
  title: translatedFieldSchema,
  releaseYear: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
