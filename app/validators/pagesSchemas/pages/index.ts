import { z } from 'zod';

import { AboutUsPageSchema } from './about-us.schema';
import { BiographyPageSchema } from './biography.schema';
import { PrivacyPolicyPageSchema } from './privacy-policy.schema';
import { ResearchPageSchema } from './research.schema';

export const PageSchema = z.discriminatedUnion('pageType', [
  AboutUsPageSchema,
  ResearchPageSchema,
  PrivacyPolicyPageSchema,
  BiographyPageSchema
]);

export type Page = z.infer<typeof PageSchema>;
