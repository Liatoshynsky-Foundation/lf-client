import { Locale } from 'next-intl';

export interface ParamsWithLanguage {
  readonly params: Promise<{ readonly lang: Locale }>;
}
