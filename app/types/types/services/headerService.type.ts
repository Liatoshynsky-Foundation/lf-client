import { FoundationInfoRepository } from '../repositories/foundationInfo.repository';
import { NavigationRepository } from '../repositories/navigation.repository';

export type HeaderServiceDeps = {
  foundationInfoRepository: Pick<FoundationInfoRepository, 'getSupportButtonLink'>;
  navigationRepository: NavigationRepository;
};
