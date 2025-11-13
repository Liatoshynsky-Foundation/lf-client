import type { ArchiveRepository } from '~/domain/repositories/archive.repository';

export const createArchiveService = (repo: ArchiveRepository) => ({
  getCaseDetail: (fund: string, caseSlug: string) => repo.getCaseDetail(fund, caseSlug)
});

export type ArchiveService = ReturnType<typeof createArchiveService>;
