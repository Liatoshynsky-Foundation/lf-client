import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const genreSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: translatedFieldSchema, required: true }
  },
  { timestamps: true }
);

export const Genre = mongoose.models.Genre ?? mongoose.model('Genre', genreSchema);
