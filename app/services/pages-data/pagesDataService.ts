import { Locale } from 'next-intl';

import { PageSlug, SchemaFactory } from './schema-factory';
import { PageDataMap } from '~/types/page/pagesBase.type';
import { isError, Result, WrapError, WrapSuccess } from '~/types/types/result';

import { PagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repo';

const makeComposed = (get: PagesDataRepository['getBySlug']) => {
  return async <S extends PageSlug>(slug: S, locale: Locale): Promise<Result<PageDataMap[S]>> => {
    const pageResult = await get(slug);
    if (isError(pageResult)) {
      return pageResult;
    }
    const schema = SchemaFactory(slug, locale);
    return schema
      ? WrapSuccess(schema.parse(pageResult.value))
      : WrapError(`No page schema found with slug: ${slug} at locale: ${locale}`);
  };
};

interface PagesDataServiceDeps {
  pagesDataRepo: PagesDataRepository;
}

export const createPagesDataService = ({ pagesDataRepo }: PagesDataServiceDeps) => ({
  getPageData: makeComposed(pagesDataRepo.getBySlug)
});

export const createDraftPagesDataService = ({ pagesDataRepo }: PagesDataServiceDeps) => ({
  getPageData: makeComposed(pagesDataRepo.getDraftBySlug)
});
