import dbConnect from '~/infrastructure/db/connect';
import { Navigation } from '~/infrastructure/models/navigation/navigation';
import { navigationSchema } from '~/validators/navigation.schema';

export const navigationRepository = {
  async getNavigation() {
    await dbConnect();

    const navigations = await Navigation.find().sort({ order: 1 }).lean();

    return navigations.map((navigation) => {
      const validated = navigationSchema.parse(navigation);

      return {
        title: validated.title,
        links: validated.links
      };
    });
  },
  async getSpecialNavigation() {
    await dbConnect();

    const specialNav = await Navigation.findOne({ title: { $in: ['Війна в Україні', 'War in Ukraine'] } }).lean();

    if (!specialNav) {
      return null;
    }

    const validated = navigationSchema.parse(specialNav);

    return {
      title: validated.title,
      links: validated.links
    };
  }
};
