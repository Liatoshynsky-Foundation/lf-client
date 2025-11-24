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
      required: true,
      index: true
    },
    order: {
      type: Number,
      required: true,
      index: true
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

export const Document = models.Document ?? model<IDocument>('Document', documentSchema);
