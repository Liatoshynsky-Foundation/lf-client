import { model, models, Schema, Types } from 'mongoose';

export interface ICase {
  _id: Types.ObjectId;
  fundId: Types.ObjectId;
  cipher: string;
  name: string;
  dates: string;
  sheets: number | null;
  contentDescription: string;
  pdfUrl: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const caseSchema = new Schema<ICase>(
  {
    fundId: {
      type: Schema.Types.ObjectId,
      ref: 'Fund',
      required: true,
      index: true
    },
    cipher: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    dates: {
      type: String,
      default: ''
    },
    sheets: {
      type: Number,
      default: null
    },
    contentDescription: {
      type: String,
      default: ''
    },
    pdfUrl: {
      type: String,
      default: null
    },
    order: {
      type: Number,
      default: 0,
      index: true
    }
  },
  {
    timestamps: true,
    collection: 'cases',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

caseSchema.virtual('documents', {
  ref: 'Document',
  localField: '_id',
  foreignField: 'caseId'
});

export const Case = models.Case ?? model<ICase>('Case', caseSchema);
