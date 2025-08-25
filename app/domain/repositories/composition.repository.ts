import type { CompositionDTO, CompositionTitlesDTO, GenreDTO, OpusDTO } from '~/domain/dto/composition.dto';

export type YearRange = { minYear: number; maxYear: number };
export type CompositionQueryFilters = {
  opuses?: Array<string | number>;
  genres?: string[];
  years?: { min?: number; max?: number };
};

export type CompositionRepository = {
  getAllGenres(): Promise<GenreDTO[]>;
  getAllOpuses(): Promise<OpusDTO[]>;
  getAllCompositionTitles(): Promise<CompositionTitlesDTO[]>;
  getCompositionsYearRange(): Promise<YearRange>;
  getAllCompositions(search?: string, filters?: CompositionQueryFilters): Promise<CompositionDTO[]>;
};
