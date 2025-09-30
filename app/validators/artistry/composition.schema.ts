import { z } from 'zod';

import { namedFilterSchema } from './namedFilter.schema';
import { opusSchema } from './opus.schema';

import { GenreDTO } from '~/domain/dto/composition.dto';
import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

const sheetMusicItemSchema = z.object({
  url: z.string(),
  dateUploaded: z.date(),
  isFree: z.boolean()
});

export const compositionSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema,
  year: z.number(),
  audioAvailable: z.boolean(),
  sheetAvailable: z.boolean(),
  sheetMusic: z.array(sheetMusicItemSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  opusId: opusSchema.optional(),
  genres: z.array(namedFilterSchema).default([]),
  categories: z.array(namedFilterSchema).default([])
});

export const compositionTableReadySchema = (localizedCompositionSchema: z.ZodSchema) =>
  localizedCompositionSchema.transform((song) => ({
    id: song._id,
    name: song.title,
    year: song.year,
    audioAvailable: song.audioAvailable,
    sheetAvailable: song.sheetAvailable,
    sheetMusic: song.sheetMusic,
    createdAt: song.createdAt,
    updatedAt: song.updatedAt,
    opus: song.opusId ? song.opusId.number : undefined,
    opusTitle: song.opusId ? song.opusId.title : undefined,
    genre: song.genres && song.genres.length > 0 ? song.genres.map((g: GenreDTO) => g.name) : []
  }));

export const compositionTitlesSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema
});

export const compositionsYearRangeSchema = z.object({
  minYear: z.number(),
  maxYear: z.number()
});

export const parseCompositionsYearRange = (data: unknown) => compositionsYearRangeSchema.parse(data);
