import { z } from 'zod';

import {
  galleryItemSchema,
  mongoObjectIdSchema,
  translatedFieldSchema,
  translatedTipTapSchema
} from '~/validators/constants';

const sheetMusicItemSchema = z
  .object({
    url: z.string().nullable(),
    name: z.string().optional(),
    fileName: z.string().nullable().optional(),
    publishDate: z.string().optional().nullable()
  })
  .transform((data) => {
    if (!data.name && data.fileName) {
      return {
        ...data,
        name: data.fileName
      };
    }
    return data;
  });

const localizedIndexationSchema = z.object({
  uk: z.boolean(),
  en: z.boolean()
});

const audioItemSchema = z.object({
  url: z.string().nullable(),
  name: z.string()
});

const performanceItemSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema,
  videoUrl: z.string()
});

const baseArtistrySchema = z.object({
  _id: mongoObjectIdSchema,
  name: translatedFieldSchema
});

export const compositionSchema = baseArtistrySchema.extend({
  year: z.number().optional().nullable(),
  genre: z.string().optional().nullable(),
  audioAvailable: z.boolean(),
  sheetAvailable: z.boolean(),
  sheetMusic: z.array(sheetMusicItemSchema).nullable().optional(),
  audios: z.array(audioItemSchema).nullable().optional()
});

export const opusSchema = baseArtistrySchema.extend({
  number: z.number(),
  numberKind: z.string(),
  additionalText: z.string().optional().nullable(),
  title: translatedFieldSchema,
  creationYear: z.string(),
  endYear: z.string().optional().nullable(),
  genre: translatedFieldSchema.optional().nullable(),
  slug: z.string(),
  description: translatedFieldSchema.optional().nullable(),
  introDescription: translatedTipTapSchema.optional().nullable(),
  parts: translatedFieldSchema.optional().nullable(),
  keywords: translatedFieldSchema.optional().nullable(),
  allowIndexation: localizedIndexationSchema.optional(),
  compositions: z.array(compositionSchema),
  performances: z.array(performanceItemSchema).optional().nullable(),
  gallery: z.array(galleryItemSchema).nullable().optional()
});

export const opusListSchema = opusSchema.omit({
  introDescription: true,
  parts: true,
  gallery: true
});

export const compositionsYearRangeSchema = z.object({
  minYear: z.number(),
  maxYear: z.number()
});

export type RawOpusListItemDTO = z.infer<typeof opusListSchema>;
export type RawOpusDetailsDTO = z.infer<typeof opusSchema>;
export type RawGalleryItemDTO = z.infer<typeof galleryItemSchema>;

export type RawCompositionDTO = z.infer<typeof compositionSchema>;
export type RawPerformanceDTO = z.infer<typeof performanceItemSchema>;
export type RawYearRangeDTO = z.infer<typeof compositionsYearRangeSchema>;

export type CompositionDocument = z.infer<typeof compositionSchema>;
export type OpusDocument = Omit<z.input<typeof opusSchema>, 'compositions'> & {
  compositions?: z.infer<typeof mongoObjectIdSchema>[];
};
