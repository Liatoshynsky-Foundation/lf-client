import { AuthorDTO, ScientificWorkDTO } from '../dto/scientificWorks.dto';

import { GetAllScientificWorksParams } from '~/infrastructure/repositories/scientific-works/scientificWorks.repository';

export interface ScientificWorksRepository {
  getAllAuthors(): Promise<AuthorDTO>;
  getAllScientificWorks(filter: GetAllScientificWorksParams): Promise<ScientificWorkDTO>;
}
