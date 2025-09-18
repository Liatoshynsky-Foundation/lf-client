import { asFunction } from 'awilix';

import { createCompositionService } from '~/services/core/compositionService';
import { createFoundationInfoService } from '~/services/core/foundationInfoService';
import { createNavigationService } from '~/services/core/navigationService';
import { createDraftPagesService, createPagesService } from '~/services/core/pagesDataService';
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

  pagesService: asFunction(({ pagesDataRepository }) => createPagesService(pagesDataRepository)).scoped(),

  draftPagesService: asFunction(({ pagesDataRepository }) => createDraftPagesService(pagesDataRepository)).scoped()
});
