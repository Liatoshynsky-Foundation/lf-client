import { Locale } from 'next-intl';
import { z } from 'zod';

import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createLocalizedPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { createLocalizedResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

export const PAGE_SLUGS = ['about-us', 'privacy-policy', 'research'] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

const schemaFactories: Record<PageSlug, (locale: Locale) => z.ZodTypeAny> = {
  'about-us': createLocalizedAboutUsPageSchema,
  'privacy-policy': createLocalizedPrivacyPolicyPageSchema,
  research: createLocalizedResearchPageSchema
};

const isPageSlug = (slug: string): slug is PageSlug => (PAGE_SLUGS as readonly string[]).includes(slug);

export const selectSchema = (slug: string, locale: Locale): z.ZodTypeAny | undefined =>
  isPageSlug(slug) ? schemaFactories[slug](locale) : undefined;
