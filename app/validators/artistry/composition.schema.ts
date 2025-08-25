import { Locale } from 'next-intl';
import { z } from 'zod';

import { createLocalizedGenreSchema, genreSchema } from './genre.schema';
import { opusSchema } from './opus.schema';

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
  genres: z.array(genreSchema).default([])
});

export const compositionsArraySchema = z.array(compositionSchema);

export const createLocalizedCompositionSchema = (locale: Locale) =>
  compositionSchema.transform((song) => ({
    id: song._id,
    name: song.title[locale],
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

export const compositionTitlesSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema
});

export const compositionNamesArraySchema = z.array(compositionTitlesSchema);

export const createLocalizedCompositionTitlesSchema = (locale: Locale) =>
  compositionSchema.pick({ _id: true, title: true }).transform((data) => ({
    id: data._id,
    title: data.title[locale]
  }));
export const createLocalizedCompositionTitlesSchemaArray = (locale: Locale) =>
  z.array(createLocalizedCompositionTitlesSchema(locale));

export const createLocalizedOpusSchema = (locale: Locale) =>
  opusSchema.transform((o) => ({
    id: o._id,
    number: o.number,
    title: o.title ? (o.title[locale] ?? o.title.en ?? o.title.uk) : undefined
  }));

export const createLocalizedOpusesArraySchema = (locale: Locale) => z.array(createLocalizedOpusSchema(locale));

export const compositionsYearRangeSchema = z.object({
  minYear: z.number(),
  maxYear: z.number()
});

export const createLocalizedGenreOptionSchema = (locale: Locale) =>
  genreSchema.transform((g) => ({
    id: g._id,
    key: g.key,
    name: g.name[locale] ?? g.name.en ?? g.name.uk
  }));

export const createLocalizedGenreOptionsArraySchema = (locale: Locale) =>
  z.array(createLocalizedGenreOptionSchema(locale));

export const parseLocalizedCompositions = (data: unknown, locale: Locale) =>
  createLocalizedCompositionsArraySchema(locale).parse(data);

export const parseLocalizedOpuses = (data: unknown, locale: Locale) =>
  createLocalizedOpusesArraySchema(locale).parse(data);

export const parseLocalizedCompositionTitles = (data: unknown, locale: Locale) =>
  createLocalizedCompositionTitlesSchema(locale).parse(data);

export const parseCompositionsYearRange = (data: unknown) => compositionsYearRangeSchema.parse(data);
