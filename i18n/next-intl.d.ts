import { type useTranslations } from 'next-intl';

import { type default as enMessages } from './messages/en.json';
import { type default as ukMessages } from './messages/uk.json';
import { type routing } from './routing';

type IsEqual<A, B> = (<T>() => T extends A ? true : false) extends <T>() => T extends B ? true : false ? true : false;

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: IsEqual<typeof enMessages, typeof ukMessages> extends true ? typeof ukMessages : never;
  }

  type TranslationKey = Parameters<ReturnType<typeof useTranslations>>[0];
}
