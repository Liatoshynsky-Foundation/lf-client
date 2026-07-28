import { z } from 'zod';

import { AboutUsPageSchema } from './about-us.schema';
import { ArtistryPageSchema } from './artistry.schema';
import { BiographyPageSchema } from './biography.schema';
import { CooperationPageSchema } from './cooperation.schema';
import { PrivacyPolicyPageSchema } from './privacy-policy.schema';
import { ResearchPageSchema } from './research.schema';
import { WarInUkrainePageSchema } from './war-in-ukraine.schema';

export const PageSchema = z.discriminatedUnion('pageType', [
  AboutUsPageSchema,
  ResearchPageSchema,
  PrivacyPolicyPageSchema,
  BiographyPageSchema,
  CooperationPageSchema,
  ArtistryPageSchema,
  WarInUkrainePageSchema
]);

export type Page = z.infer<typeof PageSchema>;
