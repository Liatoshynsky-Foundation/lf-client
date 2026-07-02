import { LocalizationErrors } from '~/constants/errors';

import TranslationNotFound from '~/shared/components/blocks/translation-not-found/TranslationNotFound';

export function ErrorPageFactory(error: string) {
  if (error.includes(LocalizationErrors.MISSING_EN_ERROR)) {
    return <TranslationNotFound />;
  }

  if (error.includes(LocalizationErrors.MISSING_UK_ERROR)) {
    return <TranslationNotFound redirectLocale="en" />;
  }
  throw new Error(`Unexpected error when fetching page: ${error}`);
}
