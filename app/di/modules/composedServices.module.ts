import { asFunction } from 'awilix';

import { createFooterService } from '~/services/composed/footer-service/footerService';
import { createHeaderService } from '~/services/composed/header-service/headerService';

export const registerComposedServices = () => ({
  headerService: asFunction(({ foundationInfoService, navigationService }) =>
    createHeaderService({ foundationInfoService, navigationService })
  ).scoped(),

  footerService: asFunction(({ foundationInfoService, navigationService }) =>
    createFooterService({ foundationInfoService, navigationService })
  ).scoped()
});
