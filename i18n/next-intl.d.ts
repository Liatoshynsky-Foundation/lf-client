import { type useTranslations } from 'next-intl';

import { type routing } from './routing';
import { type default as enMessages } from './messages/en.json';
import { type default as ukMessages } from './messages/uk.json';

type IsEqual<T, U> =
    (<G>() => G extends T ? 1 : 2) extends
        (<G>() => G extends U ? 1 : 2) ? true : false;

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: IsEqual<typeof enMessages, typeof ukMessages> extends true
            ? typeof ukMessages
            : never;
    }

    type TranslationKey = Parameters<ReturnType<typeof useTranslations>>[0];
}