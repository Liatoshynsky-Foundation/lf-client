import { LocalizationErrors } from '~/constants/errors';

import { PageNotFound } from '~/[lang]/[...unknown-route]/page-not-found/pageNotFound';
import TranslationNotFound from '~/shared/components/blocks/translation-not-found/TranslationNotFound';

export function ErrorPageFactory(error: string) {
  if (error === LocalizationErrors.MISSING_EN_ERROR) {
    return <TranslationNotFound />;
  }
  if (error === LocalizationErrors.MISSING_UK_ERROR) {
    return <PageNotFound />; // i dunno what to show in this case
  }
  throw new Error(`Unexpected error when fetching page: ${error}`);
}
