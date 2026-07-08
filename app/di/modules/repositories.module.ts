import { asFunction, asValue, AwilixContainer } from 'awilix';

import newCompositionsRepo from '~/infrastructure/repositories/artistry/compositions.repository';
import newEventRepository from '~/infrastructure/repositories/events/event.repository';
import eventsRepository from '~/infrastructure/repositories/events/events.repository';
import newFoundationInfoRepo from '~/infrastructure/repositories/foundation-info/foundationInfo.repository';
import newFundsRepository from '~/infrastructure/repositories/funds/funds.repository';
import newMediaMentionRepository from '~/infrastructure/repositories/media-mentions/mediaMention.repository';
import newNavigationRepository from '~/infrastructure/repositories/navigation/navigation.repository';
import newNewsRepository from '~/infrastructure/repositories/news/news.repository';
import newPagesDataRepo from '~/infrastructure/repositories/pages-data/pagesData.repository';
import newScientificWorksRepo from '~/infrastructure/repositories/scientific-works/scientificWorks.repository';
import newDonationOrderRepository from '~/infrastructure/repositories/way-for-pay/donationOrder.repository';
import newPaymentEventRepository from '~/infrastructure/repositories/way-for-pay/paymentEvent.repository';

export type RepositoriesModule = {
  foundationInfoRepo: ReturnType<typeof newFoundationInfoRepo>;
  navigationRepo: ReturnType<typeof newNavigationRepository>;
  compositionsRepo: ReturnType<typeof newCompositionsRepo>;
  pagesDataRepo: ReturnType<typeof newPagesDataRepo>;
  scientificWorksRepo: ReturnType<typeof newScientificWorksRepo>;
  fundsRepository: ReturnType<typeof newFundsRepository>;
  newsRepository: ReturnType<typeof newNewsRepository>;
  mediaMentionRepository: ReturnType<typeof newMediaMentionRepository>;
  eventsRepo: typeof eventsRepository;
  eventRepository: ReturnType<typeof newEventRepository>;
  donationOrderRepository: ReturnType<typeof newDonationOrderRepository>;
  paymentEventRepository: ReturnType<typeof newPaymentEventRepository>;
};

export const registerRepositoriesFor = (container: AwilixContainer) => {
  return container.register({
    foundationInfoRepo: asFunction(newFoundationInfoRepo).scoped(),
    navigationRepo: asFunction(newNavigationRepository).scoped(),
    compositionsRepo: asFunction(newCompositionsRepo).scoped(),
    pagesDataRepo: asFunction(newPagesDataRepo).scoped(),
    scientificWorksRepo: asFunction(newScientificWorksRepo).scoped(),
    fundsRepository: asFunction(newFundsRepository).scoped(),
    newsRepository: asFunction(newNewsRepository).scoped(),
    mediaMentionRepository: asFunction(newMediaMentionRepository).scoped(),
    eventsRepo: asValue(eventsRepository),
    eventRepository: asFunction(newEventRepository).scoped(),
    donationOrderRepository: asFunction(newDonationOrderRepository).scoped(),
    paymentEventRepository: asFunction(newPaymentEventRepository).scoped()
  });
};
