import { Locale } from 'next-intl';

import { selectSchema } from './selectSchema';
import { PageData } from '~/types/page/pagesBase.type';

import type { DraftPagesService, PagesService } from '~/services/core/pagesDataService';

const makeComposed = (get: (slug: string) => Promise<unknown>) => {
  return async (slug: string, locale: Locale): Promise<PageData | null> => {
    const page = await get(slug);
    if (!page) return null;

    const schema = selectSchema(slug, locale);
    return schema ? schema.parse(page) : null;
  };
};

export const createPagesDataService = (service: PagesService) => ({
  getPageData: makeComposed(service.getPageData)
});

export const createDraftPagesDataService = (service: DraftPagesService) => ({
  getPageData: makeComposed(service.getPageData)
});

export type PagesDataService = ReturnType<typeof createPagesDataService>;
export type DraftPagesDataService = ReturnType<typeof createDraftPagesDataService>;
