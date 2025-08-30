import dbConnect from '~/infrastructure/db/connect';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
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

    const query: any = {};

    if (search) {
      const regex = { $regex: search, $options: 'i' };
      query.$or = [{ 'title.uk': regex }, { 'title.en': regex }];
    }

    if (filters?.genres && Array.isArray(filters.genres) && filters.genres.length > 0) {
      const genres = await Genre.find({ key: { $in: filters.genres } }).select('_id');

      const compositionsQuery = { genres: { $in: genres.map((g) => g._id) } };

      query.$and = query.$and ? [...query.$and, compositionsQuery] : [compositionsQuery];
    }
    if (filters?.years && Array.isArray(filters.years) && filters.years.length > 0) {
      const yearQuery = { year: { $in: filters.years } };
      query.$and = query.$and ? [...query.$and, yearQuery] : [yearQuery];
    }

    const compositions = await Compositions.find(query)
      .populate('genres')
      .populate({ path: 'opusId', model: Opus })
      .lean();
    if (!compositions || compositions.length === 0) {
      return [];
    }

    return compositionsArraySchema.parse(compositions);
  }
};
