import type { OpusWithCompositionsLean } from './compositions.repository';
import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import type { CategoryDTO, CompositionDTO, CompositionTitlesDTO, GenreDTO } from '~/domain/dto/composition.dto';

export type YearRange = { minYear: number; maxYear: number };
export type CompositionQueryFilters = {
  genres?: string[];
  years?: { min?: number; max?: number };
};

export interface CompositionRepository {
  getAllGenres(): Promise<GenreDTO[]>;
  getAllCategories(): Promise<CategoryDTO[]>;
  getAllCompositionTitles(filters: CompositionsTitleFilters): Promise<CompositionTitlesDTO[]>;
  getCompositionsYearRange(): Promise<YearRange>;
  getAllCompositions(search?: string, filters?: CompositionQueryFilters): Promise<CompositionDTO[]>;
  getOpusById(id: string): Promise<OpusWithCompositionsLean | null>;
}
