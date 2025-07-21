import '~/infrastructure/models/pages-data/block/blockBase';

import dbConnect from '~/infrastructure/db/connect';
import PagesData from '~/infrastructure/models/pages-data/pagesData';
import { populatedPageSchema } from '~/validators/page/page.schema';

export const pagesDataRepository = {
  async getPageData(slug: string) {
    await dbConnect();
    const page = await PagesData.findOne({ slug }).populate('blocks').lean().exec();
    if (!page) return null;
    return populatedPageSchema.parse(page);
  }
};
