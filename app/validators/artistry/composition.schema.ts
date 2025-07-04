import { Locale } from 'next-intl';
import { z } from 'zod';

import { createLocalizedGenreSchema, genreSchema } from './genre.schema';
import { opusSchema } from './opus.schema';

import { mongoObjectIdSchema } from '~/validators/constants';

const sheetMusicItemSchema = z.object({
  url: z.string(),
  dateUploaded: z.date(),
  isFree: z.boolean()
});

export const compositionSchema = z.object({
  _id: mongoObjectIdSchema,
  title: z.string(),
  year: z.number(),
  audioAvailable: z.boolean(),
  sheetAvailable: z.boolean(),
  sheetMusic: z.array(sheetMusicItemSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  opusId: opusSchema.optional(),
  genres: z.array(genreSchema).default([])
});

export const compositionsArraySchema = z.array(compositionSchema);

export const createLocalizedCompositionSchema = (locale: Locale) =>
  compositionSchema.transform((song) => ({
    id: song._id,
    name: song.title,
    year: song.year,
    audioAvailable: song.audioAvailable,
    sheetAvailable: song.sheetAvailable,
    sheetMusic: song.sheetMusic,
    createdAt: song.createdAt,
    updatedAt: song.updatedAt,
    opus: song.opusId ? song.opusId.number : undefined,
    opusTitle: song.opusId ? song.opusId.title[locale] : undefined,
    genre:
      song.genres && song.genres.length > 0
        ? song.genres.map((g) => createLocalizedGenreSchema(locale).parse(g).name)
        : []
  }));

export const createLocalizedCompositionsArraySchema = (locale: Locale) =>
  z.array(createLocalizedCompositionSchema(locale));
