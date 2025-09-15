import dbConnect from '~/infrastructure/db/connect';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { genreHelper, searchHelper, yearHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { compositionNamesArraySchema, compositionsArraySchema } from '~/validators/artistry/composition.schema';
import { genresArraySchema } from '~/validators/artistry/genre.schema';

export const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();
    const genres = await Genre.find().lean();
    return genresArraySchema.parse(genres);
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

  async getAllCompositionTitles() {
    await dbConnect();
    const titles = await Compositions.find().select({ _id: 1, title: 1 }).lean();
    return compositionNamesArraySchema.parse(titles);
  },
  async getAllCompositions(
    search?: string,
    filters?: { categories?: Array<string | number>; genres?: string[]; years?: { min?: number; max?: number } }
  ) {
    await dbConnect();

    const conditions: any[] = [];

    const searchCond = searchHelper(search);
    if (searchCond) {
      conditions.push({ $or: searchCond });
    }

    const genreKeys = genreHelper(filters?.genres);
    if (genreKeys) {
      const found = await Genre.find({ key: { $in: genreKeys } })
        .select('_id')
        .lean();
      const ids = (found || []).map((g: any) => g._id).filter(Boolean);
      if (ids.length > 0) conditions.push({ genres: { $in: ids } });
    }

    const yearsCond = yearHelper(filters?.years);
    if (yearsCond) conditions.push(yearsCond);

    let query: any = {};
    if (conditions.length === 1) query = conditions[0];
    else if (conditions.length > 1) query = { $and: conditions };

    const compositions = await Compositions.find(query)
      .populate('genres')
      .populate({ path: 'opusId', model: Opus })
      .lean();

    if (!compositions || compositions.length === 0) return [];

    return compositionsArraySchema.parse(compositions);
  }
};
