import { ScientificWorksServiceDeps } from '~/domain/services/scientificWorks.type';
import { GetAllScientificWorksParams } from '~/infrastructure/repositories/scientific-works/scientificWorks.repository';

export const createScientificWorksService = ({ scientificWorksService }: ScientificWorksServiceDeps) => ({
  async getAllAuthors() {
    const allAuthors = await scientificWorksService.getAllAuthors();
    if (!allAuthors) return [];

    return allAuthors;
  },
  async getAllScientificWorks(filter: GetAllScientificWorksParams) {
    const allScientificWorks = await scientificWorksService.getAllScientificWorks(filter);
    if (!allScientificWorks) return [];

    return allScientificWorks;
  }
});
