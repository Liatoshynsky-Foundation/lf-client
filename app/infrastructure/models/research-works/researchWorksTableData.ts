import mongoose from 'mongoose';

import { ResearchWorkStatus } from '~/domain/dto/researchWorks.dto';

const researchWorkPdfFileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true }
  },
  { _id: false }
);

const researchWorksSchema = new mongoose.Schema({
  bibliographicDescription: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: String, required: true },
  keywords: { type: String },
  pdfFile: { type: researchWorkPdfFileSchema, default: null },
  url: { type: String, default: null },
  status: {
    type: String,
    required: true,
    enum: Array.from(Object.values(ResearchWorkStatus)),
    default: ResearchWorkStatus.Published
  }
});

export const ResearchWorks = mongoose.models.ResearchWorks ?? mongoose.model('ResearchWorks', researchWorksSchema);
