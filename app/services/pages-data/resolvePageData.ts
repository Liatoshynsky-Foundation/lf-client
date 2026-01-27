import 'server-only';
import { draftMode } from 'next/headers';
import type { Locale } from 'next-intl';

import type { PageSlug } from './schema-factory';

import { createRequestContainer } from '~/di/container';

export async function resolvePageData<S extends PageSlug>(slug: S, locale: Locale) {
  const { isEnabled } = await draftMode();
  const container = createRequestContainer();

  const selectedPagesService = isEnabled
    ? container.resolve('draftPagesDataService')
    : container.resolve('pagesDataService');

  return selectedPagesService.getPageData(slug, locale);
}
