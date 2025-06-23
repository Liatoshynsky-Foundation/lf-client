import { asFunction } from 'awilix';

import { createFoundationInfoService } from '~/services/core/foundationInfoService';
import { createNavigationService } from '~/services/core/navigationService';

export const registerCoreServices = () => ({
  foundationInfoService: asFunction(({ foundationInfoRepository }) =>
    createFoundationInfoService(foundationInfoRepository)
  ).scoped(),

  navigationService: asFunction(({ navigationRepository }) => createNavigationService(navigationRepository)).scoped()
});
