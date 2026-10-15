import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';

export interface PageMetadataConfig {
  pageTranslationKey: string;
  pageRoute: string;
  fetchPageMetaData?: () => Promise<Record<string, unknown> | null | undefined>;
}

export async function getPageMetadata(params: Language['params'], pageConfig: PageMetadataConfig): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations(pageConfig.pageTranslationKey as unknown as Parameters<typeof getTranslations>[0]);

  let pageData: Record<string, unknown> | null = null;
  if (pageConfig.fetchPageMetaData) {
    try {
      const data = await pageConfig.fetchPageMetaData();
      pageData = (data as Record<string, unknown>) ?? null;
    } catch {
      pageData = null;
    }
  }

  const getValue = <T>(val: unknown): T | undefined => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === 'object' && lang in (val as Record<string, unknown>)) {
      return (val as Record<string, T>)[lang];
    }
    return val as T;
  };

  const rawTitle = getValue<string>(pageData?.title);
  const rawDescription = getValue<string>(pageData?.description);
  const rawCanonicalUrl = getValue<string>(pageData?.canonicalUrl);
  const rawAllowIndexation = getValue<boolean>(pageData?.allowIndexation);
  const rawKeywords = getValue<string>(pageData?.keywords);

  const title = typeof rawTitle === 'string' && rawTitle.trim() !== '' ? rawTitle : t('title');
  const description =
    typeof rawDescription === 'string' && rawDescription.trim() !== '' ? rawDescription : t('description');
  const canonicalUrl =
    typeof rawCanonicalUrl === 'string' && rawCanonicalUrl.trim() !== '' ? rawCanonicalUrl : pageConfig.pageRoute;
  const allowIndexation = typeof rawAllowIndexation === 'boolean' ? rawAllowIndexation : true;

  const keywords =
    typeof rawKeywords === 'string' && rawKeywords.trim() !== ''
      ? rawKeywords
          .split(',')
          .map((item: string) => item.trim())
          .filter(Boolean)
      : undefined;

  const metadata = createSeoMeta({
    title,
    description,
    url: canonicalUrl,
    locale: lang,
    ...(keywords && { keywords })
  });

  return {
    ...metadata,
    robots: allowIndexation ? 'index, follow' : 'noindex, nofollow'
  };
}
