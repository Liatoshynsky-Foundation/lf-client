import type { MediaMentionRepository } from '~/infrastructure/repositories/media-mentions/mediaMention.repo';
import { ArraySchema } from '~/validators/constants';
import { mediaMentionListItemSchema, mediaMentionSchema } from '~/validators/mediaMention.schema';

interface MediaMentionServiceDeps {
  mediaMentionRepository: MediaMentionRepository;
}

export const createMediaMentionService = ({ mediaMentionRepository }: MediaMentionServiceDeps) => ({
  async getAllPublishedMediaMentions() {
    const mediaMentions = await mediaMentionRepository.getAllPublishedMediaMentions();
    return ArraySchema(mediaMentionListItemSchema).parse(mediaMentions);
  },

  async getMediaMentionBySlug(slug: string) {
    const mediaMention = await mediaMentionRepository.getMediaMentionBySlug(slug);
    if (!mediaMention) return null;

    return mediaMentionSchema.parse(mediaMention);
  }
});

export type MediaMentionService = ReturnType<typeof createMediaMentionService>;
