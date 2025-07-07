import dbConnect from '~/infrastructure/db/connect';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { compositionsArraySchema } from '~/validators/artistry/composition.schema';
import { genresArraySchema } from '~/validators/artistry/genre.schema';

export const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();

    const genres = await Genre.find().lean();

    return genresArraySchema.parse(genres);
  },

  async getAllCompositions() {
    await dbConnect();

    const compositions = await Compositions.find().populate('genres').populate({ path: 'opusId', model: Opus }).lean();

    if (!compositions || compositions.length === 0) {
      return [];
    }

    return compositionsArraySchema.parse(compositions);
  }
};
