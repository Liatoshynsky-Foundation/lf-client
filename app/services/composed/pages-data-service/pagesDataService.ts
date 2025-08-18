import { Locale } from 'next-intl';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';

export const createPagesDataService = ({ pagesDataRepository }: PageServiceDeps) => ({
  async getPageData(slug: string, locale: Locale) {
    const pageData = await pagesDataRepository.getPageData(slug);
    if (!pageData) return null;
    return createLocalizedAboutUsPageSchema(locale).parse(pageData);
  }
});
