import type { CompositionDTO, CompositionTitlesDTO, GenreDTO } from '~/domain/dto/composition.dto';

export type YearRange = { minYear: number; maxYear: number };
export type CompositionQueryFilters = {
  genres?: string[];
  years?: { min?: number; max?: number };
};

export type CompositionRepository = {
  getAllGenres(): Promise<GenreDTO[]>;
  getAllCompositionTitles(): Promise<CompositionTitlesDTO[]>;
  getCompositionsYearRange(): Promise<YearRange>;
  getAllCompositions(search?: string, filters?: CompositionQueryFilters): Promise<CompositionDTO[]>;
};
