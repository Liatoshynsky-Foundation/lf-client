import { PagesDataRepository } from '~/domain/repositories/pagesData.repository';

export type PageServiceDeps = {
  pagesDataRepository: PagesDataRepository;
};
