import type { Locale } from 'next-intl';

import { NavigationRepository } from '~/domain/repositories/navigation.repository';
import dbConnect from '~/infrastructure/db/connect';
import { Navigation } from '~/infrastructure/models/navigation/navigation';
import { navigationSchema } from '~/validators/navigation.schema';

export const navigationRepository: NavigationRepository = {
  async getNavigation(locale: Locale) {
    await dbConnect();

    const navigations = await Navigation.find().lean();

    return navigations.map((navigation) => {
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
  }
};
