import { z } from 'zod';

import { zTranslatedFieldSchema } from '~/validators/translation.schema';

export const zGenreDTOSchema = z.object({
  _id: z.string(),
  key: z.string(),
  name: zTranslatedFieldSchema
});

export const zGenresArrayDTOSchema = z.array(zGenreDTOSchema);
