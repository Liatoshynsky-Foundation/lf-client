import dbConnect from '~/infrastructure/db/connect';
import { ScientificWorksAuthor } from '~/infrastructure/models/scientific-works/scientificWorksAuthor';
import { ScientificWorks } from '~/infrastructure/models/scientific-works/scientificWorksTableData';
import { searchHelper } from '~/lib/utils/searchAndFiltersHelpers';
import {
  authorsSchema,
  scientificWorkSchema,
  scientificWorkTitleSchema
} from '~/validators/scientific-works/scientificWorks.schema';

const scientificWorksRepository = {
  async getAllAuthors() {
    await dbConnect();
    const authors = await ScientificWorksAuthor.find().lean();
    return authorsSchema.parse(authors);
  },

  async getAllScientificTitles() {
    await dbConnect();
    const titles = await ScientificWorks.find().select({ _id: 1, title: 1 }).lean();
    return titles.map((t) => scientificWorkTitleSchema.parse(t));
  },

  async getScientificWorksYearRange() {
    await dbConnect();

    const agg = await ScientificWorks.aggregate([
      { $match: { startYear: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: null,
          minYear: { $min: '$startYear' },
          maxYear: { $max: '$startYear' }
        }
      }
    ]);

    const row = agg?.[0];
    const now = new Date().getFullYear();

    return {
      minYear: row?.minYear ?? 1900,
      maxYear: row?.maxYear ?? now
    };
  },

  async getAllScientificWorks({
    authorIds,
    years,
    search = ''
  }: {
    authorIds?: string[];
    years?: [number, number];
    search?: string;
  }) {
    await dbConnect();

    const conditions: Record<string, unknown>[] = [];

    if (search) {
      const pattern = searchHelper(search);
      conditions.push({
        $or: [{ 'title.uk': { $regex: pattern, $options: 'i' } }, { 'title.en': { $regex: pattern, $options: 'i' } }]
      });
    }

    if (authorIds?.length) {
      conditions.push({ authors: { $in: authorIds } });
    }

    if (years) {
      const [min, max] = years;
      conditions.push({ startYear: { $gte: min, $lte: max } });
    }

    let query = {};

    if (conditions.length === 1) {
      query = conditions[0];
    } else if (conditions.length > 1) {
      query = { $and: conditions };
    }

    const works = await ScientificWorks.find(query).populate('authors').lean();

    if (!works || works.length === 0) return [];

    return works.map((w) => scientificWorkSchema.parse(w));
  }
};

function newScientificWorksRepo(): typeof scientificWorksRepository {
  return scientificWorksRepository;
}

export default newScientificWorksRepo;
