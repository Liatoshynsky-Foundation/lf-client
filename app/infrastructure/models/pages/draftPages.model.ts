import mongoose, { Document, Model, Schema } from 'mongoose';

import { PageStatus } from '~/types/enums/common.enums';

import { Page as PageType } from '~/validators/pagesSchemas/pages';

export interface IDraftPageDocument extends Omit<PageType, '_id'>, Document {}

const draftPageBaseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { uk: String, en: String },
    status: { type: String, enum: [PageStatus.Draft], required: true, default: PageStatus.Draft }
  },
  {
    timestamps: true,
    collection: 'draftpages',
    discriminatorKey: 'pageType'
  }
);

const DraftPageModel: Model<IDraftPageDocument> =
  mongoose.models.DraftPage || mongoose.model<IDraftPageDocument>('DraftPage', draftPageBaseSchema);

const draftAboutUsDetailsSchema = new Schema({
  blocks: { type: Schema.Types.Mixed, required: true }
});

const draftPrivacyPolicySchema = new Schema({
  blocks: { type: Schema.Types.Mixed, required: true }
});

export const DraftAboutUsPageModel =
  mongoose.models.DraftAboutUsPage || DraftPageModel.discriminator('DraftAboutUsPage', draftAboutUsDetailsSchema);

export const DraftPrivacyPolicyModel =
  mongoose.models.DraftPrivacyPolicyPage ||
  DraftPageModel.discriminator('DraftPrivacyPolicyPage', draftPrivacyPolicySchema);

export default DraftPageModel;
