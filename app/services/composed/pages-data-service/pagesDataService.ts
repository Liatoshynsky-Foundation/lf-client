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

export const createPagesDataService = ({ pagesDataRepository }: PageServiceDeps) => ({
  async getPageData(slug: string, locale: Locale): Promise<PageData | null> {
    const pageData = await pagesDataRepository.getPageData(slug);
    if (!pageData) return null;

    const schemaMap = {
      'about-us': createLocalizedAboutUsPageSchema(locale),
      'privacy-policy': createLocalizedPrivacyPolicyPageSchema(locale),
      research: createLocalizedResearchPageSchema(locale)
    } as const;

    const schema = schemaMap[slug as keyof typeof schemaMap];
    return schema ? schema.parse(pageData) : null;
  }
});
