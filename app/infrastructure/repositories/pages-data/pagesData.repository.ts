import { PageStatus } from '~/types/enums/common.enums';

import dbConnect from '~/infrastructure/db/connect';
import DraftPageModel from '~/infrastructure/models/pages/draftPages.model';
import PageModel from '~/infrastructure/models/pages/pages';
import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

const getBySlugFactory = (model: typeof PageModel, status: PageStatus) => async (slug: string) => {
  await dbConnect();
  const page = await model.findOne({ slug, status }).lean().exec();
  if (!page) return null;
  return PageZodSchema.parse(page);
};

export const pagesDataRepository = {
  getBySlug: getBySlugFactory(PageModel, PageStatus.Published),
  getDraftBySlug: getBySlugFactory(DraftPageModel, PageStatus.Draft)
};
