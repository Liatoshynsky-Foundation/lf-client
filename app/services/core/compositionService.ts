import type { CompositionDTO, CompositionTitlesDTO, GenreDTO } from '~/domain/dto/composition.dto';
import type {
  CompositionQueryFilters,
  CompositionRepository,
  YearRange
} from '~/domain/repositories/composition.repository';

export const createCompositionService = (repo: CompositionRepository) => ({
  getAllGenres: (): Promise<GenreDTO[]> => repo.getAllGenres(),
  getAllCompositionTitles: (): Promise<CompositionTitlesDTO[]> => repo.getAllCompositionTitles(),
  getCompositionsYearRange: (): Promise<YearRange> => repo.getCompositionsYearRange(),
  getAllCompositions: (search?: string, filters?: CompositionQueryFilters): Promise<CompositionDTO[]> =>
    repo.getAllCompositions(search, filters)
});

export type CompositionService = ReturnType<typeof createCompositionService>;
