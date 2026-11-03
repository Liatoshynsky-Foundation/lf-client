import { PageStatus } from '~/types/enums/common.enums';

import dbConnect from '~/infrastructure/db/connect';
import DraftPageModel from '~/infrastructure/models/pages/draftPages.model';
import PageModel from '~/infrastructure/models/pages/pages';
import { PageSlug } from '~/services/pages-data/schema-factory';
import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

const getBySlugFactory = (model: typeof PageModel, status: PageStatus) => async (slug: PageSlug) => {
  await dbConnect();
  const page = await model.findOne({ slug, status }).lean().exec();
  if (!page) return;
  return PageZodSchema.parse(page);
};

const getBySlugAndIdFactory =
  (model: typeof PageModel, status: PageStatus) => async (slug: PageSlug, draftId?: string) => {
    if (!draftId || !/^[a-f\d]{24}$/i.test(draftId)) return;
    await dbConnect();
    const page = await model.findOne({ _id: draftId, slug, status }).lean().exec();
    if (!page) return;
    return PageZodSchema.parse(page);
  };

function newPagesDataRepo() {
  return {
    getBySlug: getBySlugFactory(PageModel, PageStatus.Published),
    getDraftBySlugAndId: getBySlugAndIdFactory(DraftPageModel, PageStatus.Draft)
  };
}

export default newPagesDataRepo;
