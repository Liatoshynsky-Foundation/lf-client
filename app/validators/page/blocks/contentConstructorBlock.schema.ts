import { z } from 'zod';

import { mongoObjectIdSchema } from '~/validators/constants';
import { anyElementSchema } from '~/validators/page/elements/anyElement.schema';

export const contentConstructorBlockSchema = z.object({
  _id: mongoObjectIdSchema,
  blockType: z.literal('ContentConstructorBlock'),
  componentName: z.string(),
  content: z.object({
    elements: z.array(anyElementSchema)
  })
});

export type ContentConstructorBlock = z.infer<typeof contentConstructorBlockSchema>;
