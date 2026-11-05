import { asFunction, AwilixContainer } from 'awilix';

import newCompositionsRepo from '~/infrastructure/repositories/artistry/compositions.repository';
import newEventRepository from '~/infrastructure/repositories/events/event.repository';
import newFoundationInfoRepo from '~/infrastructure/repositories/foundation-info/foundationInfo.repository';
import newFundsRepository from '~/infrastructure/repositories/funds/funds.repository';
import newMediaMentionRepository from '~/infrastructure/repositories/media-mentions/mediaMention.repository';
import newNavigationRepository from '~/infrastructure/repositories/navigation/navigation.repository';
import newNewsRepository from '~/infrastructure/repositories/news/news.repository';
import newPagesDataRepo from '~/infrastructure/repositories/pages-data/pagesData.repository';
import newResearchWorksRepo from '~/infrastructure/repositories/research-works/researchWorks.repository';
import newDonationOrderRepository from '~/infrastructure/repositories/way-for-pay/donationOrder.repository';

export type RepositoriesModule = {
  foundationInfoRepo: ReturnType<typeof newFoundationInfoRepo>;
  navigationRepo: ReturnType<typeof newNavigationRepository>;
  compositionsRepo: ReturnType<typeof newCompositionsRepo>;
  pagesDataRepo: ReturnType<typeof newPagesDataRepo>;
  researchWorksRepo: ReturnType<typeof newResearchWorksRepo>;
  fundsRepository: ReturnType<typeof newFundsRepository>;
  newsRepository: ReturnType<typeof newNewsRepository>;
  mediaMentionRepository: ReturnType<typeof newMediaMentionRepository>;
  eventRepository: ReturnType<typeof newEventRepository>;
  donationOrderRepository: ReturnType<typeof newDonationOrderRepository>;
};

export const registerRepositoriesFor = (container: AwilixContainer) => {
  return container.register({
    foundationInfoRepo: asFunction(newFoundationInfoRepo).scoped(),
    navigationRepo: asFunction(newNavigationRepository).scoped(),
    compositionsRepo: asFunction(newCompositionsRepo).scoped(),
    pagesDataRepo: asFunction(newPagesDataRepo).scoped(),
    researchWorksRepo: asFunction(newResearchWorksRepo).scoped(),
    fundsRepository: asFunction(newFundsRepository).scoped(),
    newsRepository: asFunction(newNewsRepository).scoped(),
    mediaMentionRepository: asFunction(newMediaMentionRepository).scoped(),
    eventRepository: asFunction(newEventRepository).scoped(),
    donationOrderRepository: asFunction(newDonationOrderRepository).scoped()
  });
};
