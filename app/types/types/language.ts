import { Locale } from 'next-intl';

export interface Language {
  readonly params: Promise<{ readonly lang: Locale }>;
}

export type LocalizedString = {
  uk: string;
  en: string;
};

export type StringOrLocalizedString = string | LocalizedString;
