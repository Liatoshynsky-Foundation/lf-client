import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const linkSchema = new mongoose.Schema(
  {
    label: { type: translatedFieldSchema, required: true },
    href: { type: String, required: true },
    visibility: { type: Boolean }
  },
  { _id: false }
);

const navigationSchema = new mongoose.Schema(
  {
    title: { type: translatedFieldSchema, required: true },
    links: { type: [linkSchema], default: [] },
    footerOrder: { type: Number }
  },
  { timestamps: true }
);

export const Navigation = mongoose.models.Navigation ?? mongoose.model('Navigation', navigationSchema);
