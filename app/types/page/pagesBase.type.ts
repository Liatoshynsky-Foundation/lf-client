import { z } from 'zod';

import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createLocalizedPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { createLocalizedResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

export type AboutUsPage = z.infer<ReturnType<typeof createLocalizedAboutUsPageSchema>>;
export type PrivacyPolicyPage = z.infer<ReturnType<typeof createLocalizedPrivacyPolicyPageSchema>>;
export type ResearchPage = z.infer<ReturnType<typeof createLocalizedResearchPageSchema>>;

export type PageData = AboutUsPage | PrivacyPolicyPage | ResearchPage;
