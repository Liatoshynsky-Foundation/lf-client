import mongoose from 'mongoose';

import { translatedFieldSchema } from '../commonSchemas';

const scientificWorksAuthorSchema = new mongoose.Schema({
  name: { type: translatedFieldSchema, required: true },
  surname: { type: translatedFieldSchema, required: true }
});

export const ScientificWorksAuthor =
  mongoose.models.ScientificWorksAuthor ?? mongoose.model('ScientificWorksAuthor', scientificWorksAuthorSchema);
