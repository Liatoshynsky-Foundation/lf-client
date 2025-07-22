import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

export const imageElementSchema = z.object({
  elementType: z.literal('Image'),
  imageName: z.string(),
  caption: translatedFieldSchema
});
