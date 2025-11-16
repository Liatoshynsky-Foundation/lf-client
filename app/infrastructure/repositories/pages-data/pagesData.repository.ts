import { PageStatus } from '~/types/enums/common.enums';

import dbConnect from '~/infrastructure/db/connect';
import DraftPageModel from '~/infrastructure/models/pages/draftPages.model';
import PageModel from '~/infrastructure/models/pages/pages';
import { PageSlug } from '~/services/pages-data/schema-factory';
import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

const getBySlugFactory = (model: typeof PageModel, status: PageStatus) => async (slug: PageSlug) => {
  await dbConnect();
  const page = await model.findOne({ slug, status }).lean().exec();
  if (!page) return null;
  return PageZodSchema.parse(page);
};

function newPagesDataRepo() {
  return {
    getBySlug: getBySlugFactory(PageModel, PageStatus.Published),
    getDraftBySlug: getBySlugFactory(DraftPageModel, PageStatus.Draft)
  };
}

export default newPagesDataRepo;
