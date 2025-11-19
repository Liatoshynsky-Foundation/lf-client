import type { NavigationDTO } from '~/domain/dto/navigation.dto';

export interface NavigationRepository {
  getNavigation(): Promise<NavigationDTO[]>;
  getSpecialNavigation(): Promise<NavigationDTO | null>;
}
