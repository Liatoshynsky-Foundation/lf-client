import { createContainer } from 'awilix';
import { registerRepositories } from './modules/repositories.module';
import { registerServices } from './modules/services.module';

export function createRequestContainer() {
  return createContainer().register({
    ...registerRepositories(),
    ...registerServices()
  });
}
