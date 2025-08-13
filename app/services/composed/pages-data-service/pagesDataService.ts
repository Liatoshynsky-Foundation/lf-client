import { Locale } from 'next-intl';

import { transformPageForFrontend } from '~/utils/pageTransformer';

import { PageServiceDeps } from '~/domain/services/pagesService.type';

export const createPagesDataService = ({ pagesDataRepository }: PageServiceDeps) => ({
  async getPageData(slug: string, locale: Locale) {
    const pageData = await pagesDataRepository.getPageData(slug);
    if (!pageData) return null;
    return transformPageForFrontend(pageData, locale);
  }
});
