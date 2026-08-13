import type { OpusWithCompositionsLean } from './compositions.repository';
import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import type { CategoryDTO, CompositionTitlesDTO, OpusGroupDTO } from '~/domain/dto/composition.dto';

export type YearRange = { minYear: number; maxYear: number };
export type CompositionQueryFilters = {
  years?: { min?: number; max?: number };
};

export interface CompositionRepository {
  getAllGenres(): Promise<string[]>;
  getAllCategories(): Promise<CategoryDTO[]>;
  getArtistrySearchSuggestions(filters: CompositionsTitleFilters): Promise<CompositionTitlesDTO[]>;
  getCompositionsYearRange(): Promise<YearRange>;
  getAllCompositions(search?: string, filters?: CompositionQueryFilters): Promise<OpusGroupDTO[]>;
  getOpusById(id: string): Promise<OpusWithCompositionsLean | null>;
}
