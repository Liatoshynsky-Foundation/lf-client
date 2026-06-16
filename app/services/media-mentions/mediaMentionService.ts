import { loggerErrors } from '~/constants/errors';

import type { MediaMentionRepository } from '~/infrastructure/repositories/media-mentions/mediaMention.repo';
import logger from '~/middleware/logger/logger';
import { ArraySchema } from '~/validators/constants';
import { mediaMentionListItemSchema, mediaMentionSchema } from '~/validators/mediaMention.schema';

interface MediaMentionServiceDeps {
  mediaMentionRepository: MediaMentionRepository;
}

export const createMediaMentionService = ({ mediaMentionRepository }: MediaMentionServiceDeps) => ({
  async getAllPublishedMediaMentions(locale: 'uk' | 'en' = 'uk') {
    try {
      const mediaMentions = await mediaMentionRepository.getAllPublishedMediaMentions(locale);

      if (mediaMentions.length === 0) {
        return [];
      }

      return ArraySchema(mediaMentionListItemSchema).parse(mediaMentions);
    } catch (error) {
      logger.error(
        `[SERVICE:MediaMentions:getAllPublishedMediaMentions] Failed to fetch or parse media mentions. ${loggerErrors.ZOD_VALIDATION_ERROR}`,
        error
      );
      return [];
    }
  },

  async getMediaMentionBySlug(slug: string, locale: 'uk' | 'en' = 'uk') {
    try {
      const mediaMention = await mediaMentionRepository.getMediaMentionBySlug(slug, locale);
      if (!mediaMention) return null;

      return mediaMentionSchema.parse(mediaMention);
    } catch (error) {
      logger.error(
        `[SERVICE:MediaMentions:getMediaMentionBySlug] Failed to fetch or parse media mention by slug: ${slug}. ${loggerErrors.ZOD_VALIDATION_ERROR}`,
        error
      );
      return null;
    }
  }
});

export type MediaMentionService = ReturnType<typeof createMediaMentionService>;
