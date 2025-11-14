import { PageBaseMap } from '~/types/page/pagesBase.type';

import { PageSlug } from '~/services/pages-data/schema-factory';

export interface PagesDataRepository {
  getBySlug: <S extends PageSlug>(slug: PageSlug) => Promise<PageBaseMap[S] | null>;
  getDraftBySlug: <S extends PageSlug>(slug: PageSlug) => Promise<PageBaseMap[S] | null>;
}
