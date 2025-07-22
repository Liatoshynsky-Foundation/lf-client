import { Locale } from 'next-intl';

<<<<<<< HEAD:app/types/types/language.ts
export interface Language {
  readonly params: Promise<{ readonly lang: Locale }>;
=======
export interface ParamsWithLanguage {
  readonly lang: Locale;
>>>>>>> b9bd3c9 (removed context and added search params for keeping ssr):app/types/types/paramsWithLanguage.ts
}
