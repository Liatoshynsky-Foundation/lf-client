import { asFunction } from 'awilix';
import { createFooterService } from '~/services/footerService';

export const registerServices = () => ({
  footerService: asFunction(createFooterService).scoped()
});
