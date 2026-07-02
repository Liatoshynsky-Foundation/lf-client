import { loggerErrors } from '~/constants/errors';

import type { MediaMentionRepository } from '~/infrastructure/repositories/media-mentions/mediaMention.repo';
import { parseArraySafely } from '~/lib/utils/parseArraySafely';
import logger from '~/middleware/logger/logger';
import { mediaMentionListItemSchema, mediaMentionSchema } from '~/validators/mediaMention.schema';

interface MediaMentionServiceDeps {
  mediaMentionRepository: MediaMentionRepository;
}

export const createMediaMentionService = ({ mediaMentionRepository }: MediaMentionServiceDeps) => ({
  async getAllPublishedMediaMentions(_locale: 'uk' | 'en' = 'uk') {
    try {
      const mediaMentions = await mediaMentionRepository.getAllPublishedMediaMentions();

      if (mediaMentions.length === 0) {
        return [];
      }

      const { validItems, invalidCount } = parseArraySafely(mediaMentions, mediaMentionListItemSchema);

      if (invalidCount > 0) {
        logger.warn(
          `[SERVICE:MediaMentions:getAllPublishedMediaMentions] Skipped ${invalidCount} invalid media mentions records`
        );
      }

      return validItems;
    } catch (error) {
      logger.error(
        `[SERVICE:MediaMentions:getAllPublishedMediaMentions] Failed to fetch or parse media mentions. ${loggerErrors.ZOD_VALIDATION_ERROR}`,
        error
      );
      return [];
    }
  },

  async getMediaMentionBySlug(slug: string, _locale: 'uk' | 'en' = 'uk') {
    try {
      const mediaMention = await mediaMentionRepository.getMediaMentionBySlug(slug);
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