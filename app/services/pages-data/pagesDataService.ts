import { Locale } from 'next-intl';

import { PageSlug, SchemaFactory } from './schema-factory';
import { PageDataMap } from '~/types/page/pagesBase.type';
import { Result, WrapError, WrapSuccess } from '~/types/types/result';

import { PagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repo';

const makeComposed = (get: PagesDataRepository['getBySlug']) => {
  return async <S extends PageSlug>(slug: S, locale: Locale): Promise<Result<PageDataMap[S]>> => {
    const page = await get(slug);
    if (!page) {
      return WrapError(`No page found with slug: ${slug}`);
    }

    const schema = SchemaFactory(slug, locale);
    if (!schema) {
      return WrapError(`No page schema found with slug: ${slug} at locale: ${locale}`);
    }

    try {
      return WrapSuccess(schema.parse(page));
    } catch (err) {
      if (err instanceof Error) {
        return WrapError(err.message);
      }
      return WrapError('Unknown parsing error');
    }
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
