import { z } from 'zod';

import { AboutUsPageSchema } from './about-us.schema';
import { ResearchPageSchema } from './research.schema';

export const PageSchema = z.discriminatedUnion('pageType', [AboutUsPageSchema, ResearchPageSchema]);

export type Page = z.infer<typeof PageSchema>;
