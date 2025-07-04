import { ObjectId } from 'mongodb';
import { Locale } from 'next-intl';
import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

export const genreSchema = z.object({
  _id: z.union([z.instanceof(ObjectId).transform((id) => id.toString()), z.string()]),
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
