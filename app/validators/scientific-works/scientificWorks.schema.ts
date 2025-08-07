import z from 'zod';

import { mongoObjectIdSchema } from '../constants';

export const authorSchema = z.object({
  name: z.string(),
  surname: z.string()
});

export const scientificWorkSchema = z.object({
  _id: mongoObjectIdSchema,
  title: z.string(),
  startYear: z.number(),
  endYear: z.number().nullable().optional(),
  url: z.string(),
  isPreview: z.boolean(),
  authors: z.array(authorSchema)
});

export const scientificWorksSchema = z.array(scientificWorkSchema);
