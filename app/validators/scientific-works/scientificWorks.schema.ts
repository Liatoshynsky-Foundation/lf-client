import z from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from '../constants';

export const authorSchema = z.object({
  _id: mongoObjectIdSchema,
  name: translatedFieldSchema,
  surname: translatedFieldSchema
});

export const scientificWorkSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema,
  startYear: z.number().int(),
  endYear: z.number().int().nullable().optional(),
  url: z.string().nullable().optional(),
  isPreview: z.boolean(),
  authors: z.array(authorSchema)
});

export const scientificWorkTableReadySchema = (localizedSchema: z.ZodSchema) =>
  localizedSchema.transform((w) => ({
    id: w._id,
    title: w.title,
    authors: w.authors.map((a: any) => `${a.name} ${a.surname}`),
    sortableYear: w.startYear,
    year: w.endYear ? `${w.startYear}-${w.endYear}` : w.startYear,
    url: w.url,
    isPreview: w.isPreview
  }));

export const scientificWorkTitleSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema
});

export const scientificWorksSchema = z.array(scientificWorkSchema);
export const authorsSchema = z.array(authorSchema);
export const scientificWorkTitlesSchema = z.array(scientificWorkTitleSchema);
