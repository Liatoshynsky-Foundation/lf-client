import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const pageSchema = new mongoose.Schema(
  {
    title: translatedFieldSchema,
    slug: { type: String, required: true, unique: true, index: true },
    blocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Page ?? mongoose.model('Page', pageSchema);
