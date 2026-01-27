import { PageStatus } from '~/types/enums/common.enums';
import { WrapError } from '~/types/types/result';

import dbConnect from '~/infrastructure/db/connect';
import DraftPageModel from '~/infrastructure/models/pages/draftPages.model';
import PageModel from '~/infrastructure/models/pages/pages';
import { catchMissingTranslations } from '~/lib/utils/translation/parseForMissingTranslations';
import { PageSlug } from '~/services/pages-data/schema-factory';
import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

const getBySlugFactory = (model: typeof PageModel, status: PageStatus) => async (slug: PageSlug) => {
  await dbConnect();
  const page = await model.findOne({ slug, status }).lean().exec();
  if (!page) return WrapError(`No page found with slug: ${slug} and status: ${status}`);
  return catchMissingTranslations(PageZodSchema, page);
};

function newPagesDataRepo() {
  return {
    getBySlug: getBySlugFactory(PageModel, PageStatus.Published),
    getDraftBySlug: getBySlugFactory(DraftPageModel, PageStatus.Draft)
  };
}

export default newPagesDataRepo;
