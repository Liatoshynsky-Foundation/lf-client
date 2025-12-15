import { FilterQuery } from 'mongoose';

import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import { CompositionDTO, Condition, Query } from '~/domain/dto/composition.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { namedFilterHelper, searchHelper, yearHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { compositionSchema, compositionTitlesSchema } from '~/validators/artistry/composition.schema';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema } from '~/validators/constants';

const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();
    const genres = await Genre.find().lean();
    return ArraySchema(namedFilterSchema).parse(genres);
  },

  async getAllCategories() {
    await dbConnect();
    const categories = await Category.find().lean();
    return ArraySchema(namedFilterSchema).parse(categories);
  },

  async getCompositionsYearRange() {
    await dbConnect();
    const agg = await Compositions.aggregate([
      { $match: { year: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: null,
          minYear: { $min: '$year' },
          maxYear: { $max: '$year' }
        }
      }
    ]);
    const row = Array.isArray(agg) && agg.length > 0 ? agg[0] : null;
    const now = new Date().getFullYear();
    return {
      minYear: row?.minYear ?? 1900,
      maxYear: row?.maxYear ?? now
    };
  },

  async getAllCompositionTitles(filters: CompositionsTitleFilters = {}) {
    await dbConnect();

    const { search, category, genre, yearFrom, yearTo } = filters;

    const conditions: FilterQuery<CompositionDTO>[] = [];

    if (search?.trim()) {
      const pattern = searchHelper(search);
      conditions.push({
        $or: [{ 'title.uk': { $regex: pattern, $options: 'i' } }, { 'title.en': { $regex: pattern, $options: 'i' } }]
      });
    }

    const categoryKeys = namedFilterHelper(category);
    if (categoryKeys.length) {
      const categoryDocs = await Category.find({ key: { $in: categoryKeys } })
        .select('_id')
        .lean();
      const categoryIds = categoryDocs.map((d) => d._id);

      if (categoryIds.length) {
        conditions.push({ categories: { $in: categoryIds } });
      } else {
        return [];
      }
    }

    const genreKeys = namedFilterHelper(genre);
    if (genreKeys.length) {
      const genreDocs = await Genre.find({ key: { $in: genreKeys } })
        .select('_id')
        .lean();
      const genreIds = genreDocs.map((d) => d._id);

      if (genreIds.length) {
        conditions.push({ genres: { $in: genreIds } });
      } else {
        return [];
      }
    }

    const yearCond: { $gte?: number; $lte?: number } = {};
    if (yearFrom != null) yearCond.$gte = yearFrom;
    if (yearTo != null) yearCond.$lte = yearTo;
    if (yearCond.$gte != null || yearCond.$lte != null) {
      conditions.push({ year: yearCond });
    }

    const query: FilterQuery<CompositionDTO> = conditions.length ? { $and: conditions } : {};

    const titles = await Compositions.find(query, { title: 1 }).lean();
    return ArraySchema(compositionTitlesSchema).parse(titles);
  },
  async getAllCompositions(
    search?: string,
    filters?: { categories?: string[]; genres?: string[]; years?: { min?: number; max?: number } }
  ) {
    await dbConnect();

    const conditions: Condition[] = [];

    const readySearchExpression = searchHelper(search);
    if (readySearchExpression) {
      conditions.push({
        $or: [
          { 'title.uk': { $regex: readySearchExpression, $options: 'i' } },
          { 'title.en': { $regex: readySearchExpression, $options: 'i' } }
        ]
      });
    }

    const readyGenreArray = namedFilterHelper(filters?.genres);
    if (readyGenreArray.length > 0) {
      const genresIds = await Genre.find({ key: { $in: readyGenreArray } })
        .select('_id')
        .lean();
      conditions.push({ genres: { $in: genresIds } });
    }

    const readyCategoryArray = namedFilterHelper(filters?.categories);
    if (readyCategoryArray.length > 0) {
      const categoryIds = await Category.find({ key: { $in: readyCategoryArray } })
        .select('_id')
        .lean();

      conditions.push({ categories: { $in: categoryIds } });
    }

    const readyYearObject = yearHelper(filters?.years);
    if (readyYearObject) conditions.push({ year: { $gte: readyYearObject.min, $lte: readyYearObject.max } });

    let query: Query = {};
    if (conditions.length === 1) query = conditions[0];
    else if (conditions.length > 1) query = { $and: conditions };

    const compositions = await Compositions.find(query)
      .populate('genres')
      .populate('categories')
      .populate({ path: 'opusId', model: Opus })
      .lean();

    if (!compositions || compositions.length === 0) return [];

    return ArraySchema(compositionSchema).parse(compositions);
  }
};

function newCompositionsRepo(): typeof compositionsRepository {
  return compositionsRepository;
}

export default newCompositionsRepo;
