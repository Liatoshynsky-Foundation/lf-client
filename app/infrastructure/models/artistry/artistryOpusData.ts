import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const opusSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    title: { type: translatedFieldSchema, required: true },
    numberKind: { type: String, required: true },
    name: { type: translatedFieldSchema, required: true },
    additionalText: { type: String, default: null },
    creationYear: { type: String, required: true },
    endYear: { type: String, default: null },
    status: { type: String, default: 'draft' },
    genre: { type: translatedFieldSchema, required: true },
    introDescription: { type: translatedFieldSchema, default: null },
    description: { type: translatedFieldSchema, default: null },
    compositions: { type: Array<string> }
  },
  { timestamps: true, collection: 'opus' }
);

export const Opus = mongoose.models.Opus ?? mongoose.model('Opus', opusSchema);
