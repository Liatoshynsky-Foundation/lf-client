import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';

export const bulletedListElementSchema = z.object({
  elementType: z.literal('BulletedList'),
  items: z.array(translatedFieldSchema)
});
