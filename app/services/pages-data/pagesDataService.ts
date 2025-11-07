import { Locale } from 'next-intl';

import { PageSlug, SchemaFactory } from './schema-factory';
import { PageDataMap } from '~/types/page/pagesBase.type';

import { PagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repo';

const makeComposed = <S extends PageSlug>(get: (slug: S) => Promise<unknown>) => {
  return async (slug: S, locale: Locale): Promise<PageDataMap[S] | null> => {
    const page = await get(slug);
    if (!page) return null;

    const schema = SchemaFactory(slug, locale);
    return schema ? schema.parse(page) : null;
  };
};

interface PagesDataServiceDeps {
  pagesDataRepo: PagesDataRepository;
}

export const createPagesDataService = ({ pagesDataRepo }: PagesDataServiceDeps) => ({
  getPageData: makeComposed(pagesDataRepo.getBySlug as unknown as <T extends PageSlug>(slug: T) => Promise<unknown>)
});

export const createDraftPagesDataService = ({ pagesDataRepo }: PagesDataServiceDeps) => ({
  getPageData: makeComposed(
    pagesDataRepo.getDraftBySlug as unknown as <T extends PageSlug>(slug: T) => Promise<unknown>
  )
});
