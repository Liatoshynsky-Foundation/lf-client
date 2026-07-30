import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import type { CategoryDTO, CompositionDTO, CompositionTitlesDTO } from '~/domain/dto/composition.dto';

export type YearRange = { minYear: number; maxYear: number };
export type CompositionQueryFilters = {
  years?: { min?: number; max?: number };
};

export interface CompositionRepository {
  getAllGenres(): Promise<string[]>;
  getAllCategories(): Promise<CategoryDTO[]>;
  getAllCompositionTitles(filters: CompositionsTitleFilters): Promise<CompositionTitlesDTO[]>;
  getCompositionsYearRange(): Promise<YearRange>;
  getAllCompositions(search?: string, filters?: CompositionQueryFilters): Promise<CompositionDTO[]>;
}
