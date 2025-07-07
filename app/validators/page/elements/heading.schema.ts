import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

export const headingSchema = z.object({
  elementType: z.literal('Heading'),
  text: translatedFieldSchema
});
