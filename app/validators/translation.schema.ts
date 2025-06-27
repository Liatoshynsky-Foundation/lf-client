import { z } from 'zod';

export const zTranslatedFieldSchema = z.object({
  uk: z.string(),
  en: z.string()
});
