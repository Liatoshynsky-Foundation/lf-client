import { asFunction } from 'awilix';

import { createArchiveService } from '~/services/composed/archive-service/archiveService';
import { createArtistryService } from '~/services/composed/artistry-service/artistryService';
import { createFooterService } from '~/services/composed/footer-service/footerService';
import { createHeaderService } from '~/services/composed/header-service/headerService';
import {
  createDraftPagesDataService,
  createPagesDataService
} from '~/services/composed/pages-data-service/pagesDataService';
import { createScientificWorksService } from '~/services/composed/scientific-works-service/scientificWorks';
import { createAzureStorageService } from '~/services/composed/upload-service/upload';

export const registerComposedServices = () => ({
  headerService: asFunction(({ foundationInfoService, navigationService }) =>
    createHeaderService({ foundationInfoService, navigationService })
  ).scoped(),

  footerService: asFunction(({ foundationInfoService, navigationService }) =>
    createFooterService({ foundationInfoService, navigationService })
  ).scoped(),

  artistryService: asFunction(({ compositionService }) => createArtistryService({ compositionService })).scoped(),

  scientificService: asFunction(({ scientificWorksService }) =>
    createScientificWorksService({ scientificWorksService })
  ).scoped(),

  uploadService: asFunction(createAzureStorageService).singleton(),

  pagesDataService: asFunction(({ pagesService }) => createPagesDataService(pagesService)).scoped(),

  draftPagesDataService: asFunction(({ draftPagesService }) => createDraftPagesDataService(draftPagesService)).scoped(),

  archiveCaseService: asFunction(({ archiveService }) => createArchiveService({ archiveService })).scoped()
});
