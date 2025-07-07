import { asFunction } from 'awilix';

import { createArtistryService } from '~/services/composed/artistry-service/artistryService';
import { createFooterService } from '~/services/composed/footer-service/footerService';
import { createHeaderService } from '~/services/composed/header-service/headerService';

export const registerComposedServices = () => ({
  headerService: asFunction(({ foundationInfoService, navigationService }) =>
    createHeaderService({ foundationInfoService, navigationService })
  ).scoped(),

  footerService: asFunction(({ foundationInfoService, navigationService }) =>
    createFooterService({ foundationInfoService, navigationService })
  ).scoped(),

  artistryService: asFunction(({ compositionService }) => createArtistryService({ compositionService })).scoped()
});
