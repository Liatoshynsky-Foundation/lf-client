import z from 'zod';

import { mongoObjectIdSchema } from './constants';

import { ResearchWorkStatus } from '~/domain/dto/researchWorks.dto';

export const researchWorkPdfFileSchema = z.object({
  filename: z.string(),
  url: z.string(),
  mimeType: z.string()
});

export const researchWorkSchema = z.object({
  _id: mongoObjectIdSchema,
  bibliographicDescription: z.string(),
  year: z.string(),
  keywords: z.string().nullish(),
  pdfFile: researchWorkPdfFileSchema.nullish(),
  url: z.string().nullish(),
  status: z.nativeEnum(ResearchWorkStatus)
});

export const researchWorksSchema = z.array(researchWorkSchema);
