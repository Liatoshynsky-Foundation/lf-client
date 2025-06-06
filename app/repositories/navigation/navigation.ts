import { NavigationData } from '~/types/types/navigation.type';
import { Navigation } from '~/models/navigation/navigation';
import type { Locale } from 'next-intl';

import { navigationSchema } from '~/validators/navigation.schema';

export const navigationRepository = {
  async getNavigation(locale: Locale): Promise<NavigationData[]> {
    const navigations = await Navigation.find().lean();

    const parsed = navigations.map((navigation) => {
      const validated = navigationSchema.parse(navigation);

      return {
        title: validated.title[locale],
        links: validated.links.map((link) => ({
          label: link.label[locale],
          href: link.href,
          visibility: link.visibility
        }))
      };
    });

    return parsed;
  }
};
