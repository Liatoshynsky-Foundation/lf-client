import { Types } from 'mongoose';

import { MediaMentionStatus } from '~/domain/dto/mediaMention.dto';
import dbConnect from '~/infrastructure/db/connect';
import MediaMentionModel, { ILocalizedString } from '~/infrastructure/models/media-mentions/mediaMention.model';

const getLocalizedText = (field: ILocalizedString | string | undefined, locale: 'uk' | 'en'): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[locale] || field.uk || '';
};

const safeGetIsoDate = (dateData: any): string | null => {
  if (!dateData) return null;
  const parsedDate = new Date(dateData);
  return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
};

const mediaMentionRepository = {
  async getAllPublishedMediaMentions(locale: 'uk' | 'en' = 'uk') {
    await dbConnect();

    const mediaMentions = await MediaMentionModel.find({ status: MediaMentionStatus.Published })
      .select('_id url title description slug coverImage publishedAt meta')
      .sort({ publishedAt: -1 })
      .lean()
      .exec();

    const transformedMediaMentions = mediaMentions.map((mention) => {
      let localizedCoverImage = undefined;

      if (mention.coverImage) {
        localizedCoverImage = {
          ...mention.coverImage,
          alt: getLocalizedText(mention.coverImage.alt, locale)
        };
      }

      return {
        ...mention,
        _id: (mention._id as Types.ObjectId).toString(),
        publishedAt: safeGetIsoDate(mention.publishedAt),
        title: getLocalizedText(mention.title, locale),
        description: getLocalizedText(mention.description, locale),
        coverImage: localizedCoverImage
      };
    });

    return transformedMediaMentions;
  },

  async getMediaMentionBySlug(slug: string, locale: 'uk' | 'en' = 'uk') {
    await dbConnect();

    const mediaMention = await MediaMentionModel.findOne({
      slug: String(slug),
      status: MediaMentionStatus.Published
    })
      .lean()
      .exec();

    if (!mediaMention) return null;

    let localizedCoverImage = undefined;

    if (mediaMention.coverImage) {
      localizedCoverImage = {
        ...mediaMention.coverImage,
        alt: getLocalizedText(mediaMention.coverImage.alt, locale)
      };
    }

    const transformedMediaMention = {
      ...mediaMention,
      _id: (mediaMention._id as Types.ObjectId).toString(),
      publishedAt: safeGetIsoDate(mediaMention.publishedAt),
      title: getLocalizedText(mediaMention.title, locale),
      description: getLocalizedText(mediaMention.description, locale),
      coverImage: localizedCoverImage
    };

    return transformedMediaMention;
  }
};

function newMediaMentionRepository(): typeof mediaMentionRepository {
  return mediaMentionRepository;
}

export default newMediaMentionRepository;
