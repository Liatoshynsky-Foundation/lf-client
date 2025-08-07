import { asFunction } from 'awilix';

import { createPagesDataService } from '~/services/composed/pages-data-service/pagesDataService';
import { createCompositionService } from '~/services/core/compositionService';
import { createFoundationInfoService } from '~/services/core/foundationInfoService';
import { createNavigationService } from '~/services/core/navigationService';
import { createScientificWorksService } from '~/services/core/scientificWorksService';

export const registerCoreServices = () => ({
  foundationInfoService: asFunction(({ foundationInfoRepository }) =>
    createFoundationInfoService(foundationInfoRepository)
  ).scoped(),

  navigationService: asFunction(({ navigationRepository }) => createNavigationService(navigationRepository)).scoped(),

  compositionService: asFunction(({ compositionsRepository }) =>
    createCompositionService(compositionsRepository)
  ).scoped(),

  scientificWorksService: asFunction(({ scientificWorksRepository }) =>
    createScientificWorksService(scientificWorksRepository)
  ).scoped(),

  pageService: asFunction(createPagesDataService).scoped()
});
