import { Types } from 'mongoose';

import { MediaMentionStatus } from '~/domain/dto/mediaMention.dto';
import dbConnect from '~/infrastructure/db/connect';
import MediaMentionModel from '~/infrastructure/models/media-mentions/mediaMention.model';
import { ArraySchema } from '~/validators/constants';
import { mediaMentionListItemSchema, mediaMentionSchema } from '~/validators/mediaMention.schema';

const mediaMentionRepository = {
  async getAllPublishedMediaMentions(_locale: string) {
    await dbConnect();

    const mediaMentions = await MediaMentionModel.find({ status: MediaMentionStatus.Published })
      .select('_id url title description slug coverImage publishedAt meta')
      .sort({ publishedAt: -1 })
      .lean();

    const transformedMediaMentions = mediaMentions.map((mention) => ({
      ...mention,
      _id: (mention._id as Types.ObjectId).toString()
    }));

    return ArraySchema(mediaMentionListItemSchema).parse(transformedMediaMentions);
  },

  async getMediaMentionBySlug(slug: string, _locale: string) {
    await dbConnect();

    const mediaMention = await MediaMentionModel.findOne({ slug, status: MediaMentionStatus.Published }).lean();

    if (!mediaMention) return null;

    const transformedMediaMention = {
      ...mediaMention,
      _id: (mediaMention._id as Types.ObjectId).toString()
    };

    return mediaMentionSchema.parse(transformedMediaMention);
  }
};

function newMediaMentionRepository(): typeof mediaMentionRepository {
  return mediaMentionRepository;
}

export default newMediaMentionRepository;
