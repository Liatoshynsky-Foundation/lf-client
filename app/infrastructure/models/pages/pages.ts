import mongoose, { Document, Model, Schema } from 'mongoose';

import { Page as PageType } from '~/validators/pagesSchemas/pages';

export interface IPageDocument extends Omit<PageType, '_id'>, Document {}

const pageBaseSchema = new Schema<IPageDocument>(
  {
    slug: { type: String, required: true, index: true },
    title: { uk: String, en: String },
    status: { type: String, enum: ['draft', 'published'], required: true, default: 'draft' }
  },
  {
    timestamps: true,
    collection: 'pages',
    discriminatorKey: 'pageType'
  }
);

pageBaseSchema.index({ slug: 1, status: 1 }, { unique: true, name: 'slug_1_status_1' });

const PageModel: Model<IPageDocument> = mongoose.models.Page || mongoose.model<IPageDocument>('Page', pageBaseSchema);

const aboutUsDetailsSchema = new Schema({
  blocks: { type: Schema.Types.Mixed, required: true }
});

const privacyPolicySchema = new Schema({
  blocks: { type: Schema.Types.Mixed, required: true }
});

export const AboutUsPageModel =
  mongoose.models.AboutUsPage || PageModel.discriminator('AboutUsPage', aboutUsDetailsSchema);

export const PrivacyPolicyModel =
  mongoose.models.PrivacyPolicyPage || PageModel.discriminator('PrivacyPolicyPage', privacyPolicySchema);

export default PageModel;
