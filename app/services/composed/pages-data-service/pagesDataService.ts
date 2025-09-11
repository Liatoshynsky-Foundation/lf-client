import { Locale } from 'next-intl';
import { z } from 'zod';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createLocalizedPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { createLocalizedResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

type AboutUsPage = z.infer<ReturnType<typeof createLocalizedAboutUsPageSchema>>;
type PrivacyPolicyPage = z.infer<ReturnType<typeof createLocalizedPrivacyPolicyPageSchema>>;
type ResearchPage = z.infer<ReturnType<typeof createLocalizedResearchPageSchema>>;
type PageData = AboutUsPage | PrivacyPolicyPage | ResearchPage;

const selectSchema = (slug: string, locale: Locale) => {
  const map = {
    'about-us': createLocalizedAboutUsPageSchema(locale),
    'privacy-policy': createLocalizedPrivacyPolicyPageSchema(locale),
    research: createLocalizedResearchPageSchema(locale)
  } as const;
  return map[slug as keyof typeof map];
};

export const createPagesDataService = ({ pagesDataRepository }: PageServiceDeps) => ({
  async getPublishedPageData(slug: string, locale: Locale): Promise<PageData | null> {
    const page = await pagesDataRepository.getBySlugAndStatus(slug, 'published');
    if (!page) return null;
    const schema = selectSchema(slug, locale);
    return schema ? schema.parse(page) : null;
  },

  async getDraftPageData(slug: string, locale: Locale): Promise<PageData | null> {
    const page = await pagesDataRepository.getBySlugAndStatus(slug, 'draft');
    if (!page) return null;
    const schema = selectSchema(slug, locale);
    return schema ? schema.parse(page) : null;
  }
});
