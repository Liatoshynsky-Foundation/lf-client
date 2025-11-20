// import { Condition, Query } from '~/domain/dto/scientificWorks.dto';
import dbConnect from '~/infrastructure/db/connect';
import { ScientificWorksAuthor } from '~/infrastructure/models/scientific-works/scientificWorksAuthor';
import { ScientificWorks } from '~/infrastructure/models/scientific-works/scientificWorksTableData';
import { searchHelper /*yearHelper*/ } from '~/lib/utils/searchAndFiltersHelpers';
import {
  /*scientificWorksSchema, */ scientificWorkTitleSchema
} from '~/validators/scientific-works/scientificWorks.schema';

const scientificWorksRepository = {
  async getAllAuthors() {
    await dbConnect();
    const authors = await ScientificWorksAuthor.find().lean();

    return authors.map((a: any) => ({
      _id: a._id,
      key: a._id.toString(),
      name: {
        uk: `${a.name.uk} ${a.surname.uk}`.trim(),
        en: `${a.name.en} ${a.surname.en}`.trim()
      }
    }));
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
    // locale,
    authorIds,
    years,
    search = ''
  }: {
    // locale: Locale;
    authorIds?: string[];
    years?: [number, number];
    search?: string;
  }) {
    await dbConnect();

    const conditions: any[] = [];

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

    const query = conditions.length > 1 ? { $and: conditions } : (conditions[0] ?? {});

    const works = await ScientificWorks.find(query).populate('authors').lean();

    return works; // поки без DTO, просто робимо робочим
  }
};

function newScientificWorksRepo(): typeof scientificWorksRepository {
  return scientificWorksRepository;
}

export default newScientificWorksRepo;
