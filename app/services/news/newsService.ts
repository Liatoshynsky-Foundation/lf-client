import { Locale } from 'next-intl';

import { loggerErrors } from '~/constants/errors';

import type { NewsRepository } from '~/infrastructure/repositories/news/news.repo';
import { parseArraySafely } from '~/lib/utils/parseArraySafely';
import logger from '~/middleware/logger/logger';
import { LocalizeSchema } from '~/validators/localization';
import { newsListItemSchema, newsSchema } from '~/validators/news.schema';

interface NewsServiceDeps {
  newsRepository: NewsRepository;
}

export const createNewsService = ({ newsRepository }: NewsServiceDeps) => ({
  async getAllPublishedNews(locale: Locale) {
    try {
      const news = await newsRepository.getAllPublishedNews();

      if (!news || news.length === 0) {
        return [];
      }

      const { validItems, invalidCount } = parseArraySafely(news, LocalizeSchema(newsListItemSchema, locale));

      if (invalidCount > 0) {
        logger.warn(`[SERVICE:News:getAllPublishedNews] Skipped ${invalidCount} invalid news records`);
      }

      return validItems;
    } catch (error) {
      logger.error(
        `[SERVICE:News:getAllPublishedNews] Failed to fetch or parse news. ${loggerErrors.ZOD_VALIDATION_ERROR}`,
        error
      );
      return []; //ONLY AS FALLBACK
    }
  },

  async getNewsBySlug(slug: string, locale: Locale) {
    try {
      const news = await newsRepository.getNewsBySlug(slug);
      if (!news) return null;

      return LocalizeSchema(newsSchema, locale).parse(news);
    } catch (error) {
      logger.error(
        `[SERVICE:News:getNewsBySlug] Failed to fetch or parse news by slug: ${slug}. ${loggerErrors.ZOD_VALIDATION_ERROR}`,
        error
      );

      return null; // same here
    }
  }
});

export type NewsService = ReturnType<typeof createNewsService>;
