import type { CompositionDTO, GenreDTO } from '~/domain/dto/composition.dto';

export type CompositionRepository = {
  getAllGenres(): Promise<GenreDTO>;
  getAllCompositions(): Promise<CompositionDTO>;
};
