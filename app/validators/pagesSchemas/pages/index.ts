import { z } from 'zod';

import { AboutUsPageSchema } from './about-us.schema';

export const PageSchema = z.discriminatedUnion('pageType', [AboutUsPageSchema]);

export type Page = z.infer<typeof PageSchema>;
