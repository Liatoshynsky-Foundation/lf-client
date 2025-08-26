import mongoose from 'mongoose';

import dbConnect from '~/infrastructure/db/connect';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { escapeRegex } from '~/lib/utils/escapeRegex';
import { compositionNamesArraySchema, compositionsArraySchema } from '~/validators/artistry/composition.schema';
import { genresArraySchema } from '~/validators/artistry/genre.schema';

export const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();
    const genres = await Genre.find().lean();
    return genresArraySchema.parse(genres);
  },

  async getAllOpuses() {
    await dbConnect();
    const opuses = await Opus.find().lean();
    return opuses;
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
      minYear: 1900,
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
    filters?: { opuses?: Array<string | number>; genres?: string[]; years?: { min?: number; max?: number } }
  ) {
    await dbConnect();

    const query: any = {};
    if (search && typeof search === 'string' && search.trim().length > 0) {
      const re = { $regex: escapeRegex(search.trim()), $options: 'i' };
      query.$or = [{ 'title.en': re }, { 'title.uk': re }];
    }

    if (filters?.opuses && filters.opuses.length > 0) {
      const raw = filters.opuses;
      const ids: mongoose.Types.ObjectId[] = [];

      const idCandidates = raw.filter((r) => typeof r === 'string' && mongoose.Types.ObjectId.isValid(String(r)));
      for (const id of idCandidates) {
        ids.push(new mongoose.Types.ObjectId(String(id)));
      }

      const numberCandidates = raw.filter((r) => !isNaN(Number(r))).map((n) => Number(n));
      if (numberCandidates.length > 0) {
        const found = await Opus.find({ number: { $in: numberCandidates } })
          .select('_id')
          .lean();
        found.forEach((f) => ids.push(new mongoose.Types.ObjectId(String(f._id))));
      }

      if (ids.length > 0) {
        query.opusId = { $in: ids };
      } else {
        const reList = raw.map((r) => ({
          $or: [
            { 'opusId.title.en': { $regex: escapeRegex(String(r)), $options: 'i' } },
            { 'opusId.title.uk': { $regex: escapeRegex(String(r)), $options: 'i' } }
          ]
        }));
        if (reList.length > 0) query.$and = (query.$and || []).concat(reList);
      }
    }
    if (filters?.genres && filters.genres.length > 0) {
      const rawGenres = filters.genres;
      const idCandidates = rawGenres.filter((g) => typeof g === 'string' && mongoose.Types.ObjectId.isValid(g));
      const nonIdCandidates = rawGenres.filter((g) => !mongoose.Types.ObjectId.isValid(String(g)));

      const genreIds: mongoose.Types.ObjectId[] = idCandidates.map((id) => new mongoose.Types.ObjectId(String(id)));

      if (nonIdCandidates.length > 0) {
        const found = await Genre.find({
          $or: [
            { key: { $in: nonIdCandidates } },
            { 'name.en': { $in: nonIdCandidates } },
            { 'name.uk': { $in: nonIdCandidates } }
          ]
        })
          .select('_id')
          .lean();
        found.forEach((f) => genreIds.push(new mongoose.Types.ObjectId(String(f._id))));
      }

      if (genreIds.length > 0) {
        query.genres = { $in: genreIds };
      }
    }

    if (filters?.years && (filters.years.min != null || filters.years.max != null)) {
      const yQuery: any = {};
      if (typeof filters.years.min === 'number') yQuery.$gte = filters.years.min;
      if (typeof filters.years.max === 'number') yQuery.$lte = filters.years.max;
      query.year = yQuery;
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
