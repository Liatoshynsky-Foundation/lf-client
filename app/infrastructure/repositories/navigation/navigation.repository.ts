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
  }
};
