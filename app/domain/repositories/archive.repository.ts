export type ArchiveRepository = {
  getCaseDetail(fund: string, caseSlug: string): Promise<unknown>;
};
