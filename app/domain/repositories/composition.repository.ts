import type { CompositionDTO, CompositionTitlesDTO, GenreDTO } from '~/domain/dto/composition.dto';

export type CompositionRepository = {
  getAllGenres(): Promise<GenreDTO>;
  getAllCompositions(filter: string): Promise<CompositionDTO>;
  getAllCompositionTitles(): Promise<CompositionTitlesDTO>;
};
