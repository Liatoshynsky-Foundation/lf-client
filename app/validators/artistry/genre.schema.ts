import { Locale } from 'next-intl';
import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

export const genreSchema = z.object({
  _id: mongoObjectIdSchema,
  key: z.string(),
  name: translatedFieldSchema
});

export const genresArraySchema = z.array(genreSchema);

export const createLocalizedGenreSchema = (locale: Locale) =>
  genreSchema.transform((genre) => ({
    key: genre.key,
    name: genre.name[locale]
  }));

export const createLocalizedGenresArraySchema = (locale: Locale) => z.array(createLocalizedGenreSchema(locale));
