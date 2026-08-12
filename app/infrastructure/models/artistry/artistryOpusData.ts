import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const opusSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    title: { type: translatedFieldSchema, required: true },
    releaseYear: { type: mongoose.Schema.Types.Mixed },
    creationYear: { type: mongoose.Schema.Types.Mixed, required: true, default: null },
    endYear: { type: mongoose.Schema.Types.Mixed, default: null },
    status: { type: String, default: null },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    genre: { type: String, default: null }
  },
  { timestamps: true, collection: 'opus' }
);

export const Opus = mongoose.models.Opus ?? mongoose.model('Opus', opusSchema);
