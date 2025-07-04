import type { FoundationInfoService } from '~/services/core/foundationInfoService';
import type { NavigationService } from '~/services/core/navigationService';

export type HeaderServiceDeps = {
  foundationInfoService: Pick<FoundationInfoService, 'getSupportButtonLink'>;
  navigationService: Pick<NavigationService, 'getNavigation'>;
};
