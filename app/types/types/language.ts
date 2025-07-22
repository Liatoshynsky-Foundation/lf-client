import { Locale } from 'next-intl';

export interface Language {
  readonly params: Promise<{ readonly lang: Locale }>;
}
