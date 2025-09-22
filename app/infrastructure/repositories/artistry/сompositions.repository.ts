import { Condition, Query } from '~/domain/dto/composition.dto';
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

    const conditions: Condition[] = [];

    const readySearchExpression = searchHelper(search);
    if (readySearchExpression) {
      conditions.push({ $or: [{ 'title.uk': readySearchExpression }, { 'title.en': readySearchExpression }] });
    }

    const readyGenreArray = genreHelper(filters?.genres);
    if (readyGenreArray.length > 0) {
      const genresIds = await Genre.find({ key: { $in: readyGenreArray } })
        .select('_id')
        .lean();
      conditions.push({ genres: { $in: genresIds } });
    }

    const readyYearObject = yearHelper(filters?.years);
    if (readyYearObject) conditions.push({ year: { $gte: readyYearObject.min, $lte: readyYearObject.max } });

    let query: Query = {};
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
