import { asFunction } from 'awilix';

import {
  brandingRepository,
  contactRepository,
  publicRepository
} from '~/repositories/foundation-info/foundationInfo.repository';
import { navigationRepository } from '~/repositories/navigation/navigation';

export const registerRepositories = () => ({
  contactRepository: asFunction(() => contactRepository).scoped(),
  brandingRepository: asFunction(() => brandingRepository).scoped(),
  publicRepository: asFunction(() => publicRepository).scoped(),
  navigationRepository: asFunction(() => navigationRepository).scoped()
});
