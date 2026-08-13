import { z } from 'zod';

import { parseGenreString } from '~/lib/utils/parseGenreString';
import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

const sheetMusicItemSchema = z.object({
  url: z.string(),
  dateUploaded: z.date(),
  isFree: z.boolean()
});

const audioItemSchema = z.object({
  url: z.string(),
  name: z.string()
});

export const compositionItemSchema = z.object({
  _id: mongoObjectIdSchema,
  name: translatedFieldSchema,
  year: z.number().optional().nullable(),
  genre: z.string().optional().nullable(),
  audioAvailable: z.boolean(),
  sheetAvailable: z.boolean(),
  sheetMusic: z.array(sheetMusicItemSchema).nullable().optional(),
  audios: z.array(audioItemSchema).nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const opusGroupSchema = z.object({
  _id: mongoObjectIdSchema,
  number: z.number(),
  numberKind: z.string(),
  title: translatedFieldSchema,
  name: translatedFieldSchema,
  additionalText: z.string().optional().nullable(),
  creationYear: z.string(),
  endYear: z.string().optional().nullable(),
  status: z.string(),
  genre: translatedFieldSchema.optional().nullable(),
  compositions: z.array(compositionItemSchema)
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
  title: translatedFieldSchema,
  type: z.enum(['opus', 'composition']).optional(),
  opusContext: z
    .object({
      _id: z.string(),
      number: z.number(),
      numberKind: z.string(),
      additionalText: z.string().optional().nullable()
    })
    .optional()
});

export const compositionsYearRangeSchema = z.object({
  minYear: z.number(),
  maxYear: z.number()
});
