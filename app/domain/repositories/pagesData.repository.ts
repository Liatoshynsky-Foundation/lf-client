import type { PageDataDTO } from '~/domain/dto/pagesData.dto';

export type PagesDataRepository = {
  getPageData(slug: string): Promise<PageDataDTO>;
};
