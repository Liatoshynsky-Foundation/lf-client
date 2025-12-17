import { FilterQuery } from 'mongoose';

import { ScientificWorkDb } from '~/types/types/scientificWorks.types';
import { ScientificWorksTitleFilters } from '~/types/types/tableFilters.types';

import dbConnect from '~/infrastructure/db/connect';
import { ScientificWorksAuthor } from '~/infrastructure/models/scientific-works/scientificWorksAuthor';
import { ScientificWorks } from '~/infrastructure/models/scientific-works/scientificWorksTableData';
import { searchHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { authorsSchema, scientificWorksSchema } from '~/validators/scientific-works/scientificWorks.schema';

const scientificWorksRepository = {
  async getAllAuthors(fields?: string[]) {
    await dbConnect();

    const query = ScientificWorksAuthor.find();

    if (fields?.length) {
      query.select(fields.join(' '));
    }

    return authorsSchema.parse(await query.lean());
  },

  async getAllScientificTitles(filters: ScientificWorksTitleFilters = {}) {
    await dbConnect();

    const { yearFrom, yearTo, author, search } = filters;

    const conditions: FilterQuery<ScientificWorkDb>[] = [];

    if (search?.trim()) {
      const pattern = searchHelper(search);
      conditions.push({
        $or: [{ 'title.uk': { $regex: pattern, $options: 'i' } }, { 'title.en': { $regex: pattern, $options: 'i' } }]
      });
    }

    if (author?.length) {
      conditions.push({ authors: { $in: author } });
    }

    const yearCond: { $gte?: number; $lte?: number } = {};
    if (yearFrom != null) yearCond.$gte = yearFrom;
    if (yearTo != null) yearCond.$lte = yearTo;
    if (Object.keys(yearCond).length) {
      conditions.push({ startYear: yearCond });
    }

    const query = conditions.length ? { $and: conditions } : {};

    return ScientificWorks.find(query, { title: 1 }).lean();
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
    author,
    years,
    search = ''
  }: {
    author?: string[];
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

    if (author?.length) {
      conditions.push({ authors: { $in: author } });
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

    return scientificWorksSchema.parse(works);
  }
};

function newScientificWorksRepo(): typeof scientificWorksRepository {
  return scientificWorksRepository;
}

export default newScientificWorksRepo;
