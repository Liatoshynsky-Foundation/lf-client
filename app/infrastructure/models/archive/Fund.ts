import { model, models, Schema } from 'mongoose';

export interface IFund {
  id: number;
  number: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const fundSchema = new Schema<IFund>(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    number: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'funds'
  }
);

fundSchema.index({ id: 1 });

export const Fund = models.Fund ?? model<IFund>('Fund', fundSchema);
