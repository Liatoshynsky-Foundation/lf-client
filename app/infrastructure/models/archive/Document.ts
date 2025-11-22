import { model, models, Schema, Types } from 'mongoose';

export interface IDocument {
  _id: Types.ObjectId;
  caseId: Types.ObjectId;
  order: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: 'Case',
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'documents'
  }
);

documentSchema.index({ caseId: 1 });
documentSchema.index({ order: 1 });

export const Document = models.Document ?? model<IDocument>('Document', documentSchema);
