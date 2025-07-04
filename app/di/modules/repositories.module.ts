import { asFunction } from 'awilix';

import { foundationInfoRepository } from '~/infrastructure/repositories/foundation-info/foundationInfo.repository';
import { navigationRepository } from '~/infrastructure/repositories/navigation/navigation.repository';

export const registerRepositories = () => ({
  foundationInfoRepository: asFunction(() => foundationInfoRepository).scoped(),
  navigationRepository: asFunction(() => navigationRepository).scoped()
});
