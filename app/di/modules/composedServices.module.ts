import { asFunction, AwilixContainer } from 'awilix';

import { createArtistryService } from '~/services/artistry/artistryService';
import { createFooterService } from '~/services/footer/footerService';
import { createFundsService } from '~/services/funds/fundsService';
import { createHeaderService } from '~/services/header/headerService';
import { createDraftPagesDataService, createPagesDataService } from '~/services/pages-data/pagesDataService';
import { createScientificWorksService } from '~/services/scientific-works-service/scientificWorks';
import { createAzureStorageService } from '~/services/upload/upload';

export type ComposedServicesModule = {
  headerService: ReturnType<typeof createHeaderService>;
  footerService: ReturnType<typeof createFooterService>;
  artistryService: ReturnType<typeof createArtistryService>;
  scientificService: ReturnType<typeof createScientificWorksService>;
  uploadService: ReturnType<typeof createAzureStorageService>;
  pagesDataService: ReturnType<typeof createPagesDataService>;
  draftPagesDataService: ReturnType<typeof createDraftPagesDataService>;
  fundsService: ReturnType<typeof createFundsService>;
};

export const registerComposedServicesFor = (container: AwilixContainer) => {
  container.register({
    headerService: asFunction(createHeaderService).scoped(),

    footerService: asFunction(createFooterService).scoped(),

    artistryService: asFunction(createArtistryService).scoped(),

    scientificService: asFunction(createScientificWorksService).scoped(),

    uploadService: asFunction(createAzureStorageService).singleton(),

    pagesDataService: asFunction(createPagesDataService).scoped(),

    draftPagesDataService: asFunction(createDraftPagesDataService).scoped(),

    fundsService: asFunction(createFundsService).scoped()
  });
};
