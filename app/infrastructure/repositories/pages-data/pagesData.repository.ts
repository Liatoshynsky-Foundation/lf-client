import dbConnect from '~/infrastructure/db/connect';
import PageModel from '~/infrastructure/models/pages/pages';
import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

export const pagesDataRepository = {
  async getBySlugAndStatus(slug: string, status: 'draft' | 'published') {
    await dbConnect();
    const page = await PageModel.findOne({ slug, status }).lean().exec();
    if (!page) return null;
    return PageZodSchema.parse(page);
  }
};
