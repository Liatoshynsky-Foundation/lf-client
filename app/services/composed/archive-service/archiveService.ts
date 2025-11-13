import { Locale } from 'next-intl';

import type { ArchiveCaseDetail } from '~/types/page/archive.types';

import type { ArchiveServiceDeps } from '~/domain/services/archive.type';
import { createLocalizedArchiveCaseSchema } from '~/validators/pagesSchemas/pages/archive.schema';

export const createArchiveService = ({ archiveService }: ArchiveServiceDeps) => ({
  async getCase(locale: Locale, fund: string, caseSlug: string): Promise<ArchiveCaseDetail | null> {
    const raw = await archiveService.getCaseDetail(fund, caseSlug);
    if (!raw) return null;
    return createLocalizedArchiveCaseSchema(locale).parse(raw);
  }
});
