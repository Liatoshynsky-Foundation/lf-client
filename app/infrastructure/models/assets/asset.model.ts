import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAssetDocument extends Document {
  type: string;
  filename: string;
  originalname?: string;
  url: string;
  isMainComposition?: boolean;
}

const assetSchema = new Schema<IAssetDocument>(
  {
    type: { type: String, required: true },
    filename: { type: String, required: true },
    originalname: { type: String },
    url: { type: String, required: true },
    isMainComposition: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    collection: 'assets'
  }
);

const AssetModel: Model<IAssetDocument> = mongoose.models.Asset || mongoose.model<IAssetDocument>('Asset', assetSchema);

export default AssetModel;
