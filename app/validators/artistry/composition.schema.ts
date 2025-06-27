import { z } from 'zod';

import { zGenreDTOSchema } from './genre.schema';
import { zOpusDTOSchema } from './opus.schema';

const zSheetMusicItemSchema = z.object({
  url: z.string(),
  dateUploaded: z.date(),
  isFree: z.boolean()
});

const zCompositionAdditionalMenuItemSchema = z.object({
  key: z.string(),
  url: z.string(),
  isAvailable: z.boolean()
});

const zCompositionAdditionalMenuObjectSchema = z.object({
  listenComposition: zCompositionAdditionalMenuItemSchema,
  viewYoutube: zCompositionAdditionalMenuItemSchema,
  share: zCompositionAdditionalMenuItemSchema,
  viewDetails: zCompositionAdditionalMenuItemSchema
});

export const zCompositionDTOSchema = z.object({
  _id: z.string(),
  title: z.string(),
  year: z.number(),
  audioAvailable: z.boolean(),
  sheetAvailable: z.boolean(),
  songBlobUrl: z.string().optional().nullable(),
  sheetMusic: z.array(zSheetMusicItemSchema),
  additionalMenu: zCompositionAdditionalMenuObjectSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  opus: zOpusDTOSchema.optional(),
  genres: z.array(zGenreDTOSchema).default([])
});

export const zCompositionsArrayDTOSchema = z.array(zCompositionDTOSchema);
