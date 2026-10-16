import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const isAbsoluteUrl = (url?: string | null): boolean => (url ? ABSOLUTE_URL_REGEX.test(url) : false);

export interface PageMetadataConfig {
  pageTranslationKey: string;
  pageRoute: string;
  fetchPageMetaData?: () => Promise<Record<string, unknown> | null | undefined>;
}

function getLocalizedValue<T>(val: unknown, lang: string): T | undefined {
  if (val === undefined || val === null) return undefined;
  if (typeof val === 'object' && lang in (val as Record<string, unknown>)) {
    return (val as Record<string, T>)[lang];
  }
  return val as T;
}

async function loadPageData(
  fetcher?: () => Promise<Record<string, unknown> | null | undefined>
): Promise<Record<string, unknown> | null> {
  if (!fetcher) return null;
  try {
    const data = await fetcher();
    return (data as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
}

function parseKeywords(rawKeywords?: string): string[] | undefined {
  if (typeof rawKeywords !== 'string' || rawKeywords.trim() === '') {
    return undefined;
  }
  return rawKeywords
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveFallbackText(rawText: unknown, fallback: string): string {
  return typeof rawText === 'string' && rawText.trim() !== '' ? rawText.trim() : fallback;
}

export async function getPageMetadata(params: Language['params'], pageConfig: PageMetadataConfig): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations(pageConfig.pageTranslationKey as unknown as Parameters<typeof getTranslations>[0]);
  const pageData = await loadPageData(pageConfig.fetchPageMetaData);

  const rawTitle = getLocalizedValue<string>(pageData?.title, lang);
  const rawDescription = getLocalizedValue<string>(pageData?.description, lang);
  const rawCanonicalUrl = getLocalizedValue<string>(pageData?.canonicalUrl, lang);
  const rawAllowIndexation = getLocalizedValue<boolean>(pageData?.allowIndexation, lang);
  const rawKeywords = getLocalizedValue<string>(pageData?.keywords, lang);

  const title = resolveFallbackText(rawTitle, t('title'));
  const description = resolveFallbackText(rawDescription, t('description'));

  const customCanonical =
    typeof rawCanonicalUrl === 'string' && rawCanonicalUrl.trim() !== '' ? rawCanonicalUrl.trim() : null;
  const hasAbsoluteCanonical = isAbsoluteUrl(customCanonical);

  const seoMetaUrl = hasAbsoluteCanonical ? pageConfig.pageRoute : (customCanonical ?? pageConfig.pageRoute);
  const allowIndexation = typeof rawAllowIndexation === 'boolean' ? rawAllowIndexation : true;
  const keywords = parseKeywords(rawKeywords);

  const metadata = createSeoMeta({
    title,
    description,
    url: seoMetaUrl,
    locale: lang,
    ...(keywords && { keywords })
  });

  const finalCanonicalUrl = hasAbsoluteCanonical
    ? customCanonical
    : (metadata.alternates?.canonical ?? metadata.openGraph?.url);

  const alternates = finalCanonicalUrl
    ? {
        ...metadata.alternates,
        canonical: finalCanonicalUrl
      }
    : metadata.alternates;

  return {
    ...metadata,
    robots: allowIndexation ? 'index, follow' : 'noindex, nofollow',
    ...(alternates && { alternates })
  };
}
