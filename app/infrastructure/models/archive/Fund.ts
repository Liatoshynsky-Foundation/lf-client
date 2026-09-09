import { model, models, Schema, Types } from 'mongoose';

import type { LocalizedString } from '~/types/types/common.types';
import type { LocalizedTipTapDoc } from '~/types/types/tiptap.types';

import { FundStatus } from '~/domain/dto/funds.dto';

export interface IFund {
  _id: Types.ObjectId;
  id: number;
  title: LocalizedString;
  numberOfDescriptions: number;
  numberOfCases: number;
  organizationForm?: LocalizedString;
  documentCreationDate: string;
  chronologicalBoundaries?: string;
  documentLanguages?: string;
  characterAndContent?: LocalizedTipTapDoc | string;
  accessConditions?: string;
  compilerInfo?: string;
  status: FundStatus;
  createdAt: Date;
  updatedAt: Date;
}

const localizedStringSchema = {
  uk: { type: String, default: '' },
  en: { type: String, default: '' }
};

const fundSchema = new Schema<IFund>(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      uk: { type: String, required: true },
      en: { type: String, required: true }
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
      ...localizedStringSchema
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
      uk: { type: Object, required: false, default: undefined },
      en: { type: Object, required: false, default: undefined }
    },
    accessConditions: {
      type: String,
      default: ''
    },
    compilerInfo: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: Object.values(FundStatus),
      default: FundStatus.Hidden,
      required: true,
      index: true
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
