import dbConnect from '~/infrastructure/db/connect';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { compositionNamesArraySchema, compositionsArraySchema } from '~/validators/artistry/composition.schema';
import { genresArraySchema } from '~/validators/artistry/genre.schema';
function escapeRegex(input: string) {
  if (!input) return '';
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();

    const genres = await Genre.find().lean();

    return genresArraySchema.parse(genres);
  },

  async getAllCompositions(filter: string) {
    const query = { title: { $regex: escapeRegex(filter), $options: 'i' } };

    const compositions = await Compositions.find(query)
      .populate('genres')
      .populate({ path: 'opusId', model: Opus })
      .lean();
    if (!compositions || compositions.length === 0) {
      return [];
    }

    return compositionsArraySchema.parse(compositions);
  },
  async getAllTitles() {
    await dbConnect();
    const titles = await Compositions.find().select({ _id: 1, title: 1 }).lean();
    return compositionNamesArraySchema.parse(titles);
  }
};
