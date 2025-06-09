import { asFunction } from 'awilix';

import { createFooterService } from '~/services/footerService';
import { createHeaderService } from '~/services/headerService';

export const registerServices = () => ({
  footerService: asFunction(createFooterService).scoped(),
  headerService: asFunction(createHeaderService).scoped()
});
