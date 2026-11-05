import { Locale } from 'next-intl';
import { ZodError } from 'zod';

import { PAGES_DATA_ERROR_CODES, PagesDataErrorCode } from './pagesDataErrorCodes';
import { PageSlug, SchemaFactory } from './schema-factory';
import { PageDataMap } from '~/types/page/pagesBase.type';
import { Result, WrapError, WrapSuccess } from '~/types/types/result';

import { PagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repo';
import { prepareManagedPageSections } from '~/lib/utils/managedPageSections';
import logger from '~/middleware/logger/logger';

type PageGetter = (slug: PageSlug, draftId?: string) => ReturnType<PagesDataRepository['getBySlug']>;

const makeComposed = (get: PageGetter, notFoundCode: PagesDataErrorCode) => {
  return async <S extends PageSlug>(slug: S, locale: Locale, draftId?: string): Promise<Result<PageDataMap[S]>> => {
    const page = await get(slug, draftId);
    if (!page) {
      return WrapError(`No page found with slug: ${slug}`, notFoundCode);
    }

    const schema = SchemaFactory(slug, locale);
    if (!schema) {
      return WrapError(`No page schema found with slug: ${slug} at locale: ${locale}`);
    }

    try {
      return WrapSuccess(schema.parse(prepareManagedPageSections(page, locale)));
    } catch (err) {
      if (err instanceof ZodError) {
        logger.error(`[PagesDataService] Schema validation failed for slug "${slug}" [${locale}]:`, err.flatten());

        const issues = err.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
        return WrapError(`Validation error on fields: ${issues}`);
      }

      if (err instanceof Error) {
        logger.error(`[PagesDataService] Unexpected error parsing slug "${slug}":`, err);
        return WrapError(err.message);
      }

      logger.error(`[PagesDataService] Unknown error parsing slug "${slug}":`, err);
      return WrapError('Unknown parsing error');
    }
  };
};

interface PagesDataServiceDeps {
  pagesDataRepo: PagesDataRepository;
}

export const createPagesDataService = ({ pagesDataRepo }: PagesDataServiceDeps) => ({
  getPageData: makeComposed(pagesDataRepo.getBySlug, PAGES_DATA_ERROR_CODES.PAGE_NOT_FOUND)
});

export const createDraftPagesDataService = ({ pagesDataRepo }: PagesDataServiceDeps) => ({
  getPageData: makeComposed(pagesDataRepo.getDraftBySlugAndId, PAGES_DATA_ERROR_CODES.DRAFT_NOT_FOUND)
});
