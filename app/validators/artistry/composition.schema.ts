import { z } from 'zod';

import { zGenreDTOSchema } from './genre.schema';
import { zOpusDTOSchema } from './opus.schema';

const zSheetMusicItemSchema = z.object({
  url: z.string(),
  dateUploaded: z.date(),
  isFree: z.boolean()
});

export const zCompositionDTOSchema = z.object({
  _id: z.string(),
  title: z.string(),
  year: z.number(),
  audioAvailable: z.boolean(),
  sheetAvailable: z.boolean(),
  sheetMusic: z.array(zSheetMusicItemSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  opus: zOpusDTOSchema.optional(),
  genres: z.array(zGenreDTOSchema).default([])
});

export const zCompositionsArrayDTOSchema = z.array(zCompositionDTOSchema);
