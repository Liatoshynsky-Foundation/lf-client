import { ScientificWorksRepository } from '~/domain/repositories/scientificWorks.repository';
import { GetAllScientificWorksParams } from '~/infrastructure/repositories/scientific-works/scientificWorks.repository';

export const createScientificWorksService = (repo: ScientificWorksRepository) => ({
  getAllAuthors: () => repo.getAllAuthors(),
  getAllScientificWorks: (filter: GetAllScientificWorksParams) => repo.getAllScientificWorks(filter)
});

export type ScientificWorksService = ReturnType<typeof createScientificWorksService>;
