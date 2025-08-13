import mongoose, { Document, Model, Schema } from 'mongoose';

import { Page as PageType } from '~/validators/page2/page.schema';

export interface IPageDocument extends Omit<PageType, '_id'>, Document {}

const ElementMongooseSchema = new Schema<PageType['blocks'][0]['elements'][0]>(
  {
    elementType: { type: String, required: true },
    content: { type: Object, required: true }
  },
  { _id: true }
);

const BlockMongooseSchema = new Schema<PageType['blocks'][0]>(
  {
    elements: [ElementMongooseSchema]
  },
  { _id: true }
);

const PageMongooseSchema = new Schema<IPageDocument, Model<IPageDocument>>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      uk: { type: String, required: true },
      en: { type: String, required: true }
    },
    status: { type: String, enum: ['draft', 'published'] },
    blocks: [BlockMongooseSchema]
  },
  {
    timestamps: true,
    collection: 'pages'
  }
);

const PageModel: Model<IPageDocument> =
  mongoose.models.Page || mongoose.model<IPageDocument, Model<IPageDocument>>('Page', PageMongooseSchema);

export default PageModel;
