import type { PagesDataRepository } from '~/domain/repositories/pagesData.repository';

export const createPagesService = (repo: PagesDataRepository) => ({
  getPageData: (slug: string) => repo.getPageData(slug)
});

export type PagesDataService = ReturnType<typeof createPagesService>;
