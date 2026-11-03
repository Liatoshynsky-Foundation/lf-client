import 'server-only';
import { draftMode } from 'next/headers';
import type { Locale } from 'next-intl';

import type { PageSlug } from './schema-factory';

import { createRequestContainer } from '~/di/container';

export async function resolvePageData<S extends PageSlug>(slug: S, locale: Locale, draftId?: string) {
  const { isEnabled } = await draftMode();
  const container = createRequestContainer();
  if (isEnabled) {
    const draftPagesDataService = container.resolve('draftPagesDataService');
    return draftPagesDataService.getPageData(slug, locale, draftId);
  }

  const pagesDataService = container.resolve('pagesDataService');
  return pagesDataService.getPageData(slug, locale);
}
