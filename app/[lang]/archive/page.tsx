import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { PageNotFound } from '../[...unknown-route]/page-not-found/PageNotFound';
import ArchivePage from './ArchivePage/ArchivePage';
import { LocalizedPageProps } from '~/types/types/language';
import { isError, isErrorCode, UnwrapResult } from '~/types/types/result';

import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { getDraftId } from '~/lib/utils/getDraftId';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { redirectToDisablePreview } from '~/lib/utils/redirectToDisablePreview';
import { PAGES_DATA_ERROR_CODES } from '~/services/pages-data/pagesDataErrorCodes';
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

const Archive = async ({ params, searchParams }: Readonly<LocalizedPageProps>) => {
  const { lang } = await params;
  const query = await searchParams;
  setRequestLocale(lang);

  const pageResult = await resolvePageData('archive', lang, getDraftId(query));

  if (isErrorCode(pageResult, PAGES_DATA_ERROR_CODES.DRAFT_NOT_FOUND)) {
    redirectToDisablePreview(`/${lang}/${ROUTES.ARCHIVE}`, query);
  }

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
  }
  return <ArchivePage description={page.blocks.PageCaption.description} />;
};

export default Archive;
