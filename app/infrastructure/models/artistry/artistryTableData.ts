import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';
import { CompositionDocument } from '~/validators/artistry/composition.schema';

export const musicItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publishDate: { type: String, default: '' },
    fileName: { type: String, default: null },
    name: { type: String, required: true }
  },
  { _id: false }
);

const AudioItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true }
});

const compositionSchema = new mongoose.Schema<CompositionDocument>(
  {
    name: translatedFieldSchema,
    year: { type: Number },
    genre: translatedFieldSchema,
    audioAvailable: { type: Boolean, default: true },
    sheetAvailable: { type: Boolean, default: true },
    sheetMusic: [musicItemSchema],
    audios: [AudioItemSchema]
  },
  { timestamps: true }
);

export const Compositions = mongoose.models.Compositions ?? mongoose.model('Compositions', compositionSchema);
