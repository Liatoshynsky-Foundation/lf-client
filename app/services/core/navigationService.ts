import { Locale } from 'next-intl';

import type { NavigationRepository } from '~/domain/repositories/navigation.repository';

export const createNavigationService = (repo: NavigationRepository) => ({
  getNavigation: (locale: Locale) => repo.getNavigation(locale)
});

export type NavigationService = ReturnType<typeof createNavigationService>;
