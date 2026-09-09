import mongoose from 'mongoose';

import { carouselImageSchema, translatedFieldSchema } from '~/infrastructure/models/commonSchemas';
import { OpusDocument } from '~/validators/artistry/composition.schema';

const opusSchema = new mongoose.Schema<OpusDocument>(
  {
    number: { type: Number, required: true },
    title: { type: translatedFieldSchema, required: true },
    numberKind: { type: String, required: true },
    name: { type: translatedFieldSchema, required: true },
    additionalText: { type: String, default: null },
    creationYear: { type: String, required: true },
    endYear: { type: String, default: null },
    genre: { type: translatedFieldSchema, required: true },
    slug: { type: String, required: true },
    introDescription: { type: translatedFieldSchema, default: null },
    description: { type: translatedFieldSchema, default: null },
    compositions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compositions' }],
    gallery: [carouselImageSchema]
  },
  { timestamps: true, collection: 'opus' }
);

export const Opus = mongoose.models.Opus ?? mongoose.model('Opus', opusSchema);
