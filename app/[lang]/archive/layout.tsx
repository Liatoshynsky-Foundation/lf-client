import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import type { Language } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';

import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { ROUTES } from '~/shared/components/constants/routes';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  return getPageMetadata(params, {
    pageTranslationKey: 'meta.pages.archive',
    pageRoute: ROUTES.ARCHIVE,
    fetchPageMetaData: async () => {
      const { lang } = await params;
      const pageResult = await resolvePageData('archive', lang);

      if (isError(pageResult)) return null;
      return UnwrapResult(pageResult);
    }
  });
}

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return children;
}
