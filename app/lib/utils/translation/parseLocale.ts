import { Locale } from 'next-intl';

export function parseLocale(params: URLSearchParams): Locale {
  const supportedLocales: Locale[] = ['en', 'uk'];
  const locale = (params.get('locale') || 'uk') as Locale;
  if (supportedLocales.includes(locale)) {
    return locale;
  }
  return 'uk';
}
