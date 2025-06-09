import { type AwilixContainer, createContainer } from 'awilix';

import { registerRepositories } from './modules/repositories.module';
import { registerServices } from './modules/services.module';

let container: AwilixContainer | null = null;

export function createRequestContainer() {
  if (!container) {
    container = createContainer().register({
      ...registerRepositories(),
      ...registerServices()
    });
  }

  return container;
}
