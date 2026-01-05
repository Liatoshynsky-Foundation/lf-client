import { z } from 'zod';

import dbConnect from '~/infrastructure/db/connect';
import { Navigation } from '~/infrastructure/models/navigation/navigation';
import { navigationSchema } from '~/validators/navigation.schema';

const navigationRepository = {
  async getNavigation() {
    await dbConnect();

    const navigations = await Navigation.find({ order: { $gte: 0 } })
      .sort({ order: 1 })
      .lean();

    return z.array(navigationSchema).parse(navigations);
  },

  async getSpecialNavigation() {
    await dbConnect();

    const specialNav = await Navigation.findOne({ order: { $lt: 0 } }).lean();

    if (!specialNav) {
      return null;
    }

    return navigationSchema.parse(specialNav);
  },

  async getFooterNavigation() {
    await dbConnect();

    const navigations = await Navigation.find({ footerOrder: { $ne: null } })
      .sort({ footerOrder: 1 })
      .lean();

    return z.array(navigationSchema).parse(navigations);
  }
};

function newNavigationRepository(): typeof navigationRepository {
  return navigationRepository;
}

export default newNavigationRepository;
