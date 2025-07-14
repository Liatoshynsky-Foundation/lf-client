import type { CompositionRepository } from '~/domain/repositories/composition.repository';

export const createCompositionService = (repo: CompositionRepository) => ({
  getAllGenres: () => repo.getAllGenres(),
  getAllCompositions: () => repo.getAllCompositions()
});

export type CompositionService = ReturnType<typeof createCompositionService>;
