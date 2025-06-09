import { FoundationInfoRepository } from '../repositories/foundationInfo.repository';
import { NavigationRepository } from '../repositories/navigation.repository';

export type FooterServiceDeps = {
  foundationInfoRepository: FoundationInfoRepository;
  navigationRepository: NavigationRepository;
};
