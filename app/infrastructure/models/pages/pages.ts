import mongoose, { Document, Model, Schema } from 'mongoose';

import { Page as PageType } from '~/validators/pagesSchemas/pages';

export interface IPageDocument extends Omit<PageType, '_id'>, Document {}

const pageBaseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { uk: String, en: String },
    status: { type: String, enum: ['draft', 'published'], required: true, default: 'draft' }
  },
  {
    timestamps: true,
    collection: 'pages',
    discriminatorKey: 'pageType'
  }
);

const PageModel: Model<IPageDocument> = mongoose.models.Page || mongoose.model<IPageDocument>('Page', pageBaseSchema);

const aboutUsDetailsSchema = new Schema({
  blocks: { type: Schema.Types.Mixed, required: true }
});

export const AboutUsPageModel =
  mongoose.models.AboutUsPage || PageModel.discriminator('AboutUsPage', aboutUsDetailsSchema);

export default PageModel;
