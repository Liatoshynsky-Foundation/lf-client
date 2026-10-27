import { Locale } from 'next-intl';

export interface Language {
  readonly params: Promise<{ readonly lang: Locale }>;
}

export type LocalizedField = Record<Locale, string>;

export type MaybeLocalizedField = string | LocalizedField;
