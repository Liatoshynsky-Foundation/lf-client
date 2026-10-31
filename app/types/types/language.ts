import { Locale } from 'next-intl';

export interface Language {
  readonly params: Promise<{ readonly lang: Locale }>;
}

export type LocalizedString = {
  uk: string;
  en: string;
};

export type StringOrLocalizedString = string | LocalizedString;

export type SearchParams = Record<string, string | string[] | undefined>;

export type LocalizedPageProps = Language & {
  readonly searchParams: Promise<SearchParams>;
};
