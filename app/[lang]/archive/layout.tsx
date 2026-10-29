import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import type { LocalizedPageProps } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';

import { getDraftId } from '~/lib/utils/getDraftId';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params, searchParams }: LocalizedPageProps): Promise<Metadata> {
  return getPageMetadata(params, {
    pageTranslationKey: 'meta.pages.archive',
    pageRoute: ROUTES.ARCHIVE,
    fetchPageMetaData: async () => {
      const { lang } = await params;
      const query = await searchParams;
      const pageResult = await resolvePageData('archive', lang, getDraftId(query));

      if (isError(pageResult)) return null;
      return UnwrapResult(pageResult);
    }
  });
}

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}
