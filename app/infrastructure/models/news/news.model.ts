import mongoose, { Document, Model, Schema } from 'mongoose';

import { NewsDTO, NewsStatus } from '~/domain/dto/news.dto';

export interface INewsDocument extends Omit<NewsDTO, '_id'>, Document {}

const newsSchema = new Schema<INewsDocument>(
  {
    publishedAt: { type: Date, default: null },
    newsDate: { type: Date, default: null },
    title: {
      uk: { type: String, required: true },
      en: { type: String, required: true }
    },
    description: {
      uk: { type: String },
      en: { type: String }
    },
    content: {
      uk: { type: Object, required: true },
      en: { type: Object, required: true }
    },
    slug: { type: String, required: true, index: true, unique: true },
    coverImage: {
      src: { type: String, required: true },
      alt: {
        uk: { type: String, required: true },
        en: { type: String, required: true }
      },
      caption: {
        uk: { type: String, required: true },
        en: { type: String, required: true }
      },
      isTmp: { type: Boolean, default: false },
      crop: {
        x: { type: Number },
        y: { type: Number },
        width: { type: Number },
        height: { type: Number }
      }
    },
    status: {
      type: String,
      enum: [NewsStatus.Draft, NewsStatus.Published, NewsStatus.Hidden, NewsStatus.Archived, NewsStatus.Editing],
      required: true,
      default: NewsStatus.Draft
    },
    meta: {
      views: { type: Number, default: 0, required: true }
    }
  },
  {
    timestamps: true,
    collection: 'news'
  }
);

const NewsModel: Model<INewsDocument> = mongoose.models.News || mongoose.model<INewsDocument>('News', newsSchema);

export default NewsModel;
