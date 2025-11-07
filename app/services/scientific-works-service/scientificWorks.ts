import { ScientificWorksRepository } from '~/infrastructure/repositories/scientific-works/scientificWorks.repo';
import { GetAllScientificWorksParams } from '~/infrastructure/repositories/scientific-works/scientificWorks.repository';

export const createScientificWorksService = ({
  scientificWorksRepo
}: {
  scientificWorksRepo: ScientificWorksRepository;
}) => ({
  async getAllAuthors() {
    const allAuthors = await scientificWorksRepo.getAllAuthors();
    if (!allAuthors) return [];

    return allAuthors;
  },
  async getAllScientificWorks(filter: GetAllScientificWorksParams) {
    const allScientificWorks = await scientificWorksRepo.getAllScientificWorks(filter);
    if (!allScientificWorks) return [];

    return allScientificWorks;
  }
});
