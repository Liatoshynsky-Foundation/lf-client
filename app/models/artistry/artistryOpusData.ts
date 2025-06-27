import mongoose from 'mongoose';

import translatedFieldSchema from '~/models/translatedField';

const opusSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    title: { type: translatedFieldSchema, required: true }
  },
  { timestamps: true }
);

export const Opus = mongoose.models.Opus ?? mongoose.model('Opus', opusSchema);
