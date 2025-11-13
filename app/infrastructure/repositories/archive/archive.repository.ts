import type { ArchiveRepository } from '~/domain/repositories/archive.repository';
import dbConnect from '~/infrastructure/db/connect';

export const archiveRepository: ArchiveRepository = {
  async getCaseDetail(_fund, _caseSlug) {
    await dbConnect();

    return null;
  }
};
