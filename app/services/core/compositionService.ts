import type { CompositionRepository } from '~/domain/repositories/composition.repository';

export const createCompositionService = (repo: CompositionRepository) => ({
  getAllGenres: () => repo.getAllGenres(),
  getAllCompositions: (filter: string) => repo.getAllCompositions(filter),
  getAllTitles: () => repo.getAllTitles()
});

export type CompositionService = ReturnType<typeof createCompositionService>;
