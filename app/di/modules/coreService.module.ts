import { asFunction } from 'awilix';

import { createCompositionService } from '~/services/core/compositionService';
import { createPagesDataService } from '~/services/composed/pages-data-service/pagesDataService';
import { createFoundationInfoService } from '~/services/core/foundationInfoService';
import { createNavigationService } from '~/services/core/navigationService';

export const registerCoreServices = () => ({
  foundationInfoService: asFunction(({ foundationInfoRepository }) =>
    createFoundationInfoService(foundationInfoRepository)
  ).scoped(),

  navigationService: asFunction(({ navigationRepository }) => createNavigationService(navigationRepository)).scoped(),

  compositionService: asFunction(({ compositionsRepository }) =>
    createCompositionService(compositionsRepository)
  ).scoped(),

  pageService: asFunction(createPagesDataService).scoped()
});
