import { Locale } from 'next-intl';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createLocalizedResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

const schemaByType = {
  AboutUsPage: createLocalizedAboutUsPageSchema,
  Research: createLocalizedResearchPageSchema
} as const;

export const createPagesDataService = ({ pagesDataRepository }: PageServiceDeps) => ({
  async getPageData(slug: string, locale: Locale) {
    const pageData = await pagesDataRepository.getPageData(slug);
    if (!pageData) return null;

    const schemaFactory = schemaByType[pageData.pageType];
    if (!schemaFactory) return null;

    return schemaFactory(locale).parse(pageData);
  }
});
