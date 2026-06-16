import mongoose, { Document, Model, Schema } from 'mongoose';

import { MediaMentionStatus } from '~/domain/dto/mediaMention.dto';

export interface ILocalizedString {
  uk: string;
  en?: string;
}

export interface IMediaMentionDocument extends Document {
  url: string;
  title: ILocalizedString;
  description: ILocalizedString;
  slug: string;
  coverImage: {
    src: string;
    alt?: ILocalizedString | string;
    width?: number;
    height?: number;
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    } | null;
  };
  status: MediaMentionStatus;
  publishedAt?: Date | null;
  meta: {
    views: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const mediaMentionSchema = new Schema<IMediaMentionDocument>(
  {
    url: { type: String, required: true, unique: true },
    title: {
      uk: { type: String, required: true },
      en: { type: String }
    },
    description: {
      uk: { type: String, required: true },
      en: { type: String }
    },
    slug: { type: String, required: true, index: true, unique: true },
    coverImage: {
      src: { type: String, required: true },
      alt: { type: Schema.Types.Mixed },
      width: { type: Number },
      height: { type: Number },
      crop: {
        x: { type: Number },
        y: { type: Number },
        width: { type: Number },
        height: { type: Number }
      }
    },
    status: {
      type: String,
      enum: Object.values(MediaMentionStatus),
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
