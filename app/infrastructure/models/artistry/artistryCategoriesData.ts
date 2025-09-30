import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const categorySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: translatedFieldSchema, required: true }
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category ?? mongoose.model('Category', categorySchema);
