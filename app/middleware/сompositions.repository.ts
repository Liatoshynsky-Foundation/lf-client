import { ICompositionDocument, ICompositionDTO } from '~/types/types/composition.types';
import { IGenreDocument } from '~/types/types/genre.types';

import dbConnect from '~/db/connect';
import { Genre } from '~/models/artistry/artistryGenreData';
import { Opus } from '~/models/artistry/artistryOpusData';
import { Compositions } from '~/models/artistry/artistryTableData';
import { transformComposition, transformGenre } from '~/models/transformers';
import { zCompositionsArrayDTOSchema } from '~/validators/artistry/composition.schema';
import { zGenresArrayDTOSchema } from '~/validators/artistry/genre.schema';

export const compositionsRepository = {
  async getAllGenres(): Promise<IGenreDocument[]> {
    await dbConnect();
    const genres = await Genre.find().lean<IGenreDocument[]>();
    const genresToValidate = genres.map(transformGenre);
    return zGenresArrayDTOSchema.parse(genresToValidate);
  },
  async getAllCompositions(): Promise<ICompositionDTO[]> {
    await dbConnect();
    const compositionsFromDb = await Compositions.find()
      .populate('genres')
      .populate({ path: 'opusId', model: Opus })
      .lean<ICompositionDocument[]>();
    if (!compositionsFromDb || compositionsFromDb.length === 0) {
      return [];
    }
    const parsed = compositionsFromDb.map(transformComposition);
    return zCompositionsArrayDTOSchema.parse(parsed);
  }
};
