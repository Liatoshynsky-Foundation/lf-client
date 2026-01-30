import { Locale } from 'next-intl';

import type { NewsRepository } from '~/infrastructure/repositories/news/news.repo';
import { ArraySchema, LocalizeSchema } from '~/validators/constants';
import { newsListItemSchema, newsSchema } from '~/validators/news.schema';

interface NewsServiceDeps {
  newsRepository: NewsRepository;
}

export const createNewsService = ({ newsRepository }: NewsServiceDeps) => ({
  async getAllPublishedNews(locale: Locale) {
    const news = await newsRepository.getAllPublishedNews();
    return ArraySchema(LocalizeSchema(newsListItemSchema, locale)).parse(news);
  },

  async getNewsBySlug(slug: string, locale: Locale) {
    const news = await newsRepository.getNewsBySlug(slug);
    if (!news) return null;

    return LocalizeSchema(newsSchema, locale).parse(news);
  }
});

export type NewsService = ReturnType<typeof createNewsService>;
