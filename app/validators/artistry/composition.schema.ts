import { z } from 'zod';

import { opusSchema } from './opus.schema';

import { parseGenreString } from '~/lib/utils/parseGenreString';
import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

const sheetMusicItemSchema = z.object({
  url: z.string(),
  dateUploaded: z.date(),
  isFree: z.boolean()
});

export const compositionSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema,
  year: z.number().optional().nullable(),
  audioAvailable: z.boolean(),
  sheetAvailable: z.boolean(),
  sheetMusic: z.array(sheetMusicItemSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  opusId: z.union([z.string(), opusSchema]).optional().nullable(),
  genre: z.string().optional().nullable(),
  categories: z.array(z.unknown()).default([])
});

export const compositionTableReadySchema = (localizedCompositionSchema: z.ZodSchema) =>
  localizedCompositionSchema.transform((song) => {
    const opus = typeof song.opusId === 'object' && song.opusId ? song.opusId : null;

    let opusYearFormatted: string | number | undefined;
    if (opus) {
      const creation = opus.creationYear;
      const end = opus.endYear;
      const release = opus.releaseYear;

      if (creation && end) {
        opusYearFormatted = `${creation} - ${end}`;
      } else if (creation) {
        opusYearFormatted = creation;
      } else if (release) {
        opusYearFormatted = release;
      }
    }

    return {
      id: song._id,
      name: song.title,
      year: song.year ?? null,
      audioAvailable: song.audioAvailable,
      sheetAvailable: song.sheetAvailable,
      sheetMusic: song.sheetMusic,
      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
      opus: opus ? opus.number : undefined,
      opusTitle: opus ? opus.title : undefined,
      opusYear: opusYearFormatted,
      opusGenres: opus ? parseGenreString(opus.genre) : [],
      genre: parseGenreString(song.genre)
    };
  });

export const compositionTitlesSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema
});

export const compositionsYearRangeSchema = z.object({
  minYear: z.number(),
  maxYear: z.number()
});
