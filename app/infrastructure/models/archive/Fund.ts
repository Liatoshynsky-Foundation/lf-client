import { model, models, Schema, Types } from 'mongoose';

export interface IFund {
  _id: Types.ObjectId;
  id: number;
  number: { en: string; uk: string };
  title: { en: string; uk: string };
  numberOfDescriptions: number;
  numberOfCases: number;
  organizationForm: string;
  documentCreationDate: string;
  chronologicalBoundaries: string;
  documentLanguages: string;
  characterAndContent: string;
  accessConditions: string;
  compilerInfo: string;
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
    },
    numberOfDescriptions: {
      type: Number,
      default: 0
    },
    numberOfCases: {
      type: Number,
      default: 0
    },
    organizationForm: {
      type: String,
      default: ''
    },
    documentCreationDate: {
      type: String,
      default: ''
    },
    chronologicalBoundaries: {
      type: String,
      default: ''
    },
    documentLanguages: {
      type: String,
      default: ''
    },
    characterAndContent: {
      type: String,
      default: ''
    },
    accessConditions: {
      type: String,
      default: ''
    },
    compilerInfo: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    collection: 'funds',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

fundSchema.virtual('cases', {
  ref: 'Case',
  localField: '_id',
  foreignField: 'fundId'
});

export const Fund = models.Fund ?? model<IFund>('Fund', fundSchema);
