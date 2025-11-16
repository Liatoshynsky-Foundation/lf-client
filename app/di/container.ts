import { type AwilixContainer, createContainer } from 'awilix';

import { ComposedServicesModule, registerComposedServicesFor } from './modules/composedServices.module';
import { registerRepositoriesFor, RepositoriesModule } from './modules/repositories.module';

let container: AwilixContainer<RepositoriesModule & ComposedServicesModule> | null = null;

export function createRequestContainer() {
  return createRootContainer().createScope();
}

export function createRootContainer() {
  if (container) {
    return container;
  }

  container = createContainer();
  registerRepositoriesFor(container);
  registerComposedServicesFor(container);

  return container;
}
