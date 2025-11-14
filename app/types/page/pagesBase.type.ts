import { z } from 'zod';

import { PageSlug } from '~/services/pages-data/schema-factory';
import { ExcludeDBFields, Localize } from '~/validators/constants';
import { AboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { PrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

export type AboutUsPageBase = ExcludeDBFields<z.infer<typeof AboutUsPageSchema>>;
export type PrivacyPolicyPageBase = ExcludeDBFields<z.infer<typeof PrivacyPolicyPageSchema>>;
export type ResearchPageBase = ExcludeDBFields<z.infer<typeof ResearchPageSchema>>;

export interface PageBaseMap {
  'about-us': AboutUsPageBase;
  'privacy-policy': PrivacyPolicyPageBase;
  research: ResearchPageBase;
}

export type AboutUsPage = Localize<AboutUsPageBase>;
export type PrivacyPolicyPage = Localize<PrivacyPolicyPageBase>;
export type ResearchPage = Localize<ResearchPageBase>;

export interface PageDataMap {
  'about-us': AboutUsPage;
  'privacy-policy': PrivacyPolicyPage;
  research: ResearchPage;
}

export type PageForSlug<S extends PageSlug> = S extends PageSlug ? PageDataMap[S] : never;
