import type { NavigationRepository } from '~/domain/repositories/navigation.repository';

export const createNavigationService = (repo: NavigationRepository) => ({
  getNavigation: () => repo.getNavigation()
});

export type NavigationService = ReturnType<typeof createNavigationService>;
