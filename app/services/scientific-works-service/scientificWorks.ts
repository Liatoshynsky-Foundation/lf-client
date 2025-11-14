import { ScientificWorksRepository } from '~/infrastructure/repositories/scientific-works/scientificWorks.repo';
import { GetAllScientificWorksParams } from '~/infrastructure/repositories/scientific-works/scientificWorks.repository';

export const createScientificWorksService = ({
  scientificWorksRepo
}: {
  scientificWorksRepo: ScientificWorksRepository;
}) => ({
  async getAllAuthors() {
    return scientificWorksRepo.getAllAuthors() ?? [];
  },
  async getAllScientificWorks(filter: GetAllScientificWorksParams) {
    return scientificWorksRepo.getAllScientificWorks(filter) ?? [];
  }
});
