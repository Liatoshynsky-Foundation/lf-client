import mongoose, { Document, Model, Schema } from 'mongoose';

import { PageStatus } from '~/types/enums/common.enums';

import { Page as PageType } from '~/validators/pagesSchemas/pages';

export interface IPageDocument extends Omit<PageType, '_id'>, Document {}

const pageBaseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { uk: String, en: String },
    status: { type: String, enum: [PageStatus.Published], required: true, default: PageStatus.Published }
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

const privacyPolicySchema = new Schema({
  blocks: { type: Schema.Types.Mixed, required: true }
});

export const AboutUsPageModel =
  mongoose.models.AboutUsPage || PageModel.discriminator('AboutUsPage', aboutUsDetailsSchema);

export const PrivacyPolicyModel =
  mongoose.models.PrivacyPolicyPage || PageModel.discriminator('PrivacyPolicyPage', privacyPolicySchema);

export default PageModel;
