import { NewsDTO, NewsListItemDTO } from '~/domain/dto/news.dto';

export interface NewsRepository {
  getAllPublishedNews(): Promise<NewsListItemDTO[]>;
  getNewsBySlug(slug: string, includeUnpublished?: boolean): Promise<NewsDTO | null>;
}
