import mongoose, { Document, Model, Schema } from 'mongoose';

import { MediaMentionDTO, MediaMentionStatus } from '~/domain/dto/mediaMention.dto';

export interface IMediaMentionDocument extends Omit<MediaMentionDTO, '_id'>, Document {}

const mediaMentionSchema = new Schema<IMediaMentionDocument>(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, index: true, unique: true },
    coverImage: {
      src: { type: String, required: true },
      alt: { type: String },
      width: { type: Number },
      height: { type: Number }
    },
    status: {
      type: String,
      enum: [
        MediaMentionStatus.Draft,
        MediaMentionStatus.Published,
        MediaMentionStatus.Hidden,
        MediaMentionStatus.Archived,
        MediaMentionStatus.Editing
      ],
      required: true,
      default: MediaMentionStatus.Draft
    },
    publishedAt: { type: Date, default: null },
    meta: {
      views: { type: Number, default: 0, required: true }
    }
  },
  {
    timestamps: true,
    collection: 'mediamentions'
  }
);

const MediaMentionModel: Model<IMediaMentionDocument> =
  mongoose.models.MediaMention || mongoose.model<IMediaMentionDocument>('MediaMention', mediaMentionSchema);

export default MediaMentionModel;
