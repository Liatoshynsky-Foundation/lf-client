import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'uk'],
  defaultLocale: 'uk',
  localeDetection: false
});
