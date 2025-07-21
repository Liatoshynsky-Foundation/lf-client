import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';
import { anyBlockSchema } from '~/validators/page/blocks/anyBlock.schema';

export const populatedPageSchema = z.object({
  _id: mongoObjectIdSchema,
  title: translatedFieldSchema,
  slug: z.string(),
  blocks: z.array(anyBlockSchema),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type PopulatedPage = z.infer<typeof populatedPageSchema>;
