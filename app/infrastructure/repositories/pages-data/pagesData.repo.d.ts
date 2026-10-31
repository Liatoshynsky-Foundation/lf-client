import { PageBaseMap } from '~/types/page/pagesBase.type';

import { PageSlug } from '~/services/pages-data/schema-factory';

export interface PagesDataRepository {
  getBySlug: <S extends PageSlug>(slug: S) => Promise<Result<PageBaseMap[S]>>;
  getDraftBySlugAndId: <S extends PageSlug>(slug: S, draftId?: string) => Promise<Result<PageBaseMap[S]>>;
}
