import { Types } from 'mongoose';

import dbConnect from '~/infrastructure/db/connect';
import { ScientificWorksAuthor } from '~/infrastructure/models/scientific-works/scientificWorksAuthor';
import { ScientificWorks } from '~/infrastructure/models/scientific-works/scientificWorksTableData';
import { scientificWorksSchema } from '~/validators/scientific-works/scientificWorks.schema';

export type GetAllScientificWorksParams = {
  years?: number[];
  authorIds?: string[];
  title?: string;
};

export const scientificWorksRepository = {
  async getAllAuthors() {
    await dbConnect();

    const authors = await ScientificWorksAuthor.find().lean();
    return scientificWorksSchema.parse(authors);
  },

  async getAllScientificWorks(params: GetAllScientificWorksParams = {}) {
    await dbConnect();

    const { years, authorIds, title } = params;
    const filter: Record<string, unknown> = {};

    if (years && years.length > 0) {
      filter.$or = years.map((year) => ({
        $and: [
          { startYear: { $lte: year } },
          {
            $or: [{ endYear: { $gte: year } }, { endYear: null }, { endYear: { $exists: false } }]
          }
        ]
      }));
    }

    if (authorIds && authorIds.length > 0) {
      filter.authors = {
        $in: authorIds.filter((id) => Types.ObjectId.isValid(id)).map((id) => new Types.ObjectId(id))
      };
    }

    if (title && title.trim() !== '') {
      filter.title = {
        $regex: title.trim(),
        $options: 'i'
      };
    }

    const scientificWorks = await ScientificWorks.find(filter).populate('authors').lean();
    return scientificWorksSchema.parse(scientificWorks);
  }
};
