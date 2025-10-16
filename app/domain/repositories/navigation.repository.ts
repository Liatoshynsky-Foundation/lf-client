import type { NavigationDTO } from '../dto/navigation.dto';

export type NavigationRepository = {
  getNavigation(): Promise<NavigationDTO[]>;
  getSpecialNavigation(): Promise<NavigationDTO[]>;
};
