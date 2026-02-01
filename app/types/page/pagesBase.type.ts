import { z } from 'zod';

import { PageSlug } from '~/services/pages-data/schema-factory';
import { ExcludeDBFields } from '~/validators/constants';
import { Localize } from '~/validators/localization';
import { AboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { BiographyPageSchema } from '~/validators/pagesSchemas/pages/biography.schema';
import { CooperationPageSchema } from '~/validators/pagesSchemas/pages/cooperation.schema';
import { PrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

export type AboutUsPageBase = ExcludeDBFields<z.infer<typeof AboutUsPageSchema>>;
export type PrivacyPolicyPageBase = ExcludeDBFields<z.infer<typeof PrivacyPolicyPageSchema>>;
export type ResearchPageBase = ExcludeDBFields<z.infer<typeof ResearchPageSchema>>;
export type BiographyPageBase = ExcludeDBFields<z.infer<typeof BiographyPageSchema>>;
export type CooperationPageBase = ExcludeDBFields<z.infer<typeof CooperationPageSchema>>;

export interface PageBaseMap {
  'about-us': AboutUsPageBase;
  'privacy-policy': PrivacyPolicyPageBase;
  research: ResearchPageBase;
  biography: BiographyPageBase;
  cooperation: CooperationPageBase;
}

export type AboutUsPage = Localize<AboutUsPageBase>;
export type PrivacyPolicyPage = Localize<PrivacyPolicyPageBase>;
export type ResearchPage = Localize<ResearchPageBase>;
export type BiographyPage = Localize<BiographyPageBase>;
export type CooperationPage = Localize<CooperationPageBase>;

export interface PageDataMap {
  'about-us': AboutUsPage;
  'privacy-policy': PrivacyPolicyPage;
  research: ResearchPage;
  biography: BiographyPage;
  cooperation: CooperationPage;
}

export type PageForSlug<S extends PageSlug> = S extends PageSlug ? PageDataMap[S] : never;
