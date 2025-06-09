import { asFunction } from 'awilix';

import { foundationInfoRepository } from '~/repositories/foundation-info/foundationInfo.repository';
import { navigationRepository } from '~/repositories/navigation/navigation';

export const registerRepositories = () => ({
  foundationInfoRepository: asFunction(() => foundationInfoRepository).scoped(),
  navigationRepository: asFunction(() => navigationRepository).scoped()
});
