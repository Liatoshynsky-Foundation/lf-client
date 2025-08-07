import mongoose from 'mongoose';

const scientificWorksSchema = new mongoose.Schema({
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScientificWorksAuthor' }],
  title: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number },
  url: { type: String, required: true },
  isPreview: { type: Boolean, default: false }
});

export const ScientificWorks =
  mongoose.models.ScientificWorks ?? mongoose.model('ScientificWorks', scientificWorksSchema);
