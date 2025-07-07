import { z } from 'zod';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

export const teamBlockSchema = z.object({
  _id: mongoObjectIdSchema,
  blockType: z.literal('TeamBlock'),
  componentName: z.string(),
  content: z.object({
    introText: translatedFieldSchema,
    sectionTitle: translatedFieldSchema,
    members: z.array(
      z.object({
        imageName: z.string(),
        name: translatedFieldSchema,
        description: translatedFieldSchema
      })
    )
  })
});
