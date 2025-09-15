import { Locale } from 'next-intl';
import { z } from 'zod';

import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createLocalizedPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { createLocalizedResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

export type PageSlug = 'about-us' | 'privacy-policy' | 'research';

export const selectSchema = (slug: string, locale: Locale) => {
  const map = {
    'about-us': createLocalizedAboutUsPageSchema(locale),
    'privacy-policy': createLocalizedPrivacyPolicyPageSchema(locale),
    research: createLocalizedResearchPageSchema(locale)
  } as const;

  return map[slug as PageSlug] as z.ZodTypeAny | undefined;
};
