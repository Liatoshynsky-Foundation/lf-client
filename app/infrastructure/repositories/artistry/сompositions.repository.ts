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

  async getAllCompositions(filter: string) {
    const query = {
      $or: [
        { 'title.en': { $regex: escapeRegex(filter), $options: 'i' } },
        { 'title.uk': { $regex: escapeRegex(filter), $options: 'i' } }
      ]
    };
    const query = {
      $or: [
        { 'title.en': { $regex: escapeRegex(filter), $options: 'i' } },
        { 'title.uk': { $regex: escapeRegex(filter), $options: 'i' } }
      ]
    };

    const compositions = await Compositions.find(query)
      .populate('genres')
      .populate({ path: 'opusId', model: Opus })
      .lean();
    if (!compositions || compositions.length === 0) {
      return [];
    }

    return compositionsArraySchema.parse(compositions);
  },
  async getAllCompositionTitles() {
    await dbConnect();
    const titles = await Compositions.find().select({ _id: 1, title: 1 }).lean();
    console.log('titles', titles);
    return compositionNamesArraySchema.parse(titles);
  }
};
