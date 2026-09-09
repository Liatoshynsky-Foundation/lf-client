import { model, models, Schema, Types } from 'mongoose';

import type { LocalizedString } from '~/types/types/common.types';

import { FundStatus } from '~/domain/dto/funds.dto';

type CasePdfFile = {
  filename: string;
  url: string;
  mimeType: string;
};

export interface ICase {
  _id: Types.ObjectId;
  fundId: Types.ObjectId;
  descriptionNumber?: number;
  caseNumber?: number;
  caseName?: LocalizedString;
  caseDate?: LocalizedString;
  sheetsNumber?: number | null;
  caseDescriptions?: LocalizedString;
  detailedCaseDescription?: LocalizedString | null;
  pdfFile?: CasePdfFile | null;
  status?: FundStatus;
  cipher?: string;
  name?: string;
  dates?: string;
  sheets?: number | null;
  contentDescription?: string;
  pdfUrl?: string | null;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const localizedStringSchema = {
  uk: { type: String, default: '' },
  en: { type: String, default: '' }
};

const casePdfFileSchema = new Schema<CasePdfFile>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true }
  },
  { _id: false }
);

const caseSchema = new Schema<ICase>(
  {
    fundId: {
      type: Schema.Types.ObjectId,
      ref: 'Fund',
      required: true,
      index: true
    },
    descriptionNumber: {
      type: Number,
      index: true
    },
    caseNumber: {
      type: Number,
      index: true
    },
    caseName: localizedStringSchema,
    caseDate: localizedStringSchema,
    sheetsNumber: {
      type: Number,
      default: null
    },
    caseDescriptions: localizedStringSchema,
    detailedCaseDescription: {
      type: localizedStringSchema,
      default: null
    },
    pdfFile: {
      type: casePdfFileSchema,
      default: null
    },
    status: {
      type: String,
      enum: Object.values(FundStatus),
      default: FundStatus.Hidden,
      index: true
    },
    cipher: {
      type: String
    },
    name: {
      type: String
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
