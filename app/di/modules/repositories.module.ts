import { asFunction } from 'awilix';

import { compositionsRepository } from '~/infrastructure/repositories/artistry/сompositions.repository';
import { foundationInfoRepository } from '~/infrastructure/repositories/foundation-info/foundationInfo.repository';
import { navigationRepository } from '~/infrastructure/repositories/navigation/navigation.repository';
import { pagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repository';
import { scientificWorksRepository } from '~/infrastructure/repositories/scientific-works/scientificWorks.repository';

export const registerRepositories = () => ({
  foundationInfoRepository: asFunction(() => foundationInfoRepository).scoped(),
  navigationRepository: asFunction(() => navigationRepository).scoped(),
  compositionsRepository: asFunction(() => compositionsRepository).scoped(),
  pagesDataRepository: asFunction(() => pagesDataRepository).scoped(),
  scientificWorksRepository: asFunction(() => scientificWorksRepository).scoped()
});
