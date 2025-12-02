import { z } from 'zod';

import {
  authorSchema,
  scientificWorkSchema,
  scientificWorkTitleSchema
} from '~/validators/scientific-works/scientificWorks.schema';

export type ScientificWorkDb = z.infer<typeof scientificWorkSchema>;
export type AuthorDb = z.infer<typeof authorSchema>;
export type ScientificWorkTitleDb = z.infer<typeof scientificWorkTitleSchema>;
