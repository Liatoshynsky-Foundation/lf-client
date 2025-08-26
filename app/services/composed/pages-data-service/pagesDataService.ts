import { Locale } from 'next-intl';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createLocalizedPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';

export const createPagesDataService = ({ pagesDataRepository }: PageServiceDeps) => ({
  async getPageData(slug: string, locale: Locale) {
    const pageData = await pagesDataRepository.getPageData(slug);
    if (!pageData) return null;
    switch (slug) {
      case 'about-us':
        return createLocalizedAboutUsPageSchema(locale).parse(pageData);

      case 'privacy-policy':
        return createLocalizedPrivacyPolicyPageSchema(locale).parse(pageData);
    }
  }
});
