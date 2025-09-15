import type { PagesDataRepository } from '~/domain/repositories/pagesData.repository';

export const createPagesService = (repo: PagesDataRepository) => ({
  getPageData: (slug: string) => repo.getBySlug(slug)
});

export const createDraftPagesService = (repo: PagesDataRepository) => ({
  getPageData: (slug: string) => repo.getDraftBySlug(slug)
});

export type PagesService = ReturnType<typeof createPagesService>;
export type DraftPagesService = ReturnType<typeof createDraftPagesService>;
