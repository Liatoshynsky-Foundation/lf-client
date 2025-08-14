import dbConnect from '~/infrastructure/db/connect';
import PagesData from '~/infrastructure/models/pages-data/pagesData';
import { PageSchema as PageZodSchema } from '~/validators/page2/page.schema';

export const pagesDataRepository = {
  async getPageData(slug: string) {
    await dbConnect();
    const page = await PagesData.findOne({ slug }).lean().exec();
    if (!page) return null;
    return PageZodSchema.parse(page);
  }
};
