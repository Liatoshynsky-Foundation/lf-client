import { z } from 'zod';

import { PageSlug } from '~/services/pages-data/schema-factory';
import { ExcludeDBFields, Localize } from '~/validators/constants';
import { AboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { PrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

export type AboutUsPage = ExcludeDBFields<Localize<z.infer<typeof AboutUsPageSchema>>>;
export type PrivacyPolicyPage = ExcludeDBFields<Localize<z.infer<typeof PrivacyPolicyPageSchema>>>;
export type ResearchPage = ExcludeDBFields<Localize<z.infer<typeof ResearchPageSchema>>>;

export interface PageDataMap {
  'about-us': AboutUsPage;
  'privacy-policy': PrivacyPolicyPage;
  research: ResearchPage;
}

export type PageForSlug<S extends PageSlug> = S extends PageSlug ? PageDataMap[S] : never;
