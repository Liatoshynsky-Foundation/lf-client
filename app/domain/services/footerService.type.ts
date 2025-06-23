import type { FoundationInfoService } from '~/services/core/foundationInfoService';
import type { NavigationService } from '~/services/core/navigationService';

export type FooterServiceDeps = {
  foundationInfoService: FoundationInfoService;
  navigationService: Pick<NavigationService, 'getNavigation'>;
};
