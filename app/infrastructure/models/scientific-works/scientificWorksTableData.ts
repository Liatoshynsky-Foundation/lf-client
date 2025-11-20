import mongoose from 'mongoose';

import { translatedFieldSchema } from '../commonSchemas';

const scientificWorksSchema = new mongoose.Schema({
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScientificWorksAuthor', index: true }],
  title: { type: translatedFieldSchema, required: true },
  startYear: { type: Number, required: true, index: true },
  endYear: { type: Number, default: null },
  url: { type: String, default: null },
  isPreview: { type: Boolean, default: false }
});

scientificWorksSchema.index({ authors: 1, startYear: 1 });

export const ScientificWorks =
  mongoose.models.ScientificWorks ?? mongoose.model('ScientificWorks', scientificWorksSchema);
