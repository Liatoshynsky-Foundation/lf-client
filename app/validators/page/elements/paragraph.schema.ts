import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

export const paragraphElementSchema = z.object({
  elementType: z.literal('Paragraph'),
  text: translatedFieldSchema
});
