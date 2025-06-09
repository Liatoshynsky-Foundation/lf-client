import { Locale } from 'next-intl';

import { NavigationData } from '../dto/navigation.dto';

export type NavigationRepository = {
  getNavigation(locale: Locale): Promise<NavigationData[]>;
};
