import { type AwilixContainer, createContainer } from 'awilix';

import { registerComposedServices } from './modules/composedServices.module';
import { registerCoreServices } from './modules/coreService.module';
import { registerRepositories } from './modules/repositories.module';

let container: AwilixContainer | null = null;

export function createRequestContainer() {
  container ??= createContainer().register({
    ...registerRepositories(),
    ...registerCoreServices(),
    ...registerComposedServices()
  });

  return container;
}
