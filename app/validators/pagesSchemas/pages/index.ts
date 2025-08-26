import { z } from 'zod';

import { AboutUsPageSchema } from './about-us.schema';
import { ResearchPageSchema } from './research.schema';
import { PrivacyPolicyPageSchema } from './privacy-policy.schema';

export const PageSchema = z.discriminatedUnion('pageType', [
  AboutUsPageSchema,
  ResearchPageSchema,
  PrivacyPolicyPageSchema
]);

export type Page = z.infer<typeof PageSchema>;
