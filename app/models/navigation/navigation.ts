import mongoose from 'mongoose';

const translatedFieldSchema = new mongoose.Schema(
  {
    uk: { type: String, required: true },
    en: { type: String, required: true }
  },
  { _id: false }
);

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
    links: { type: [linkSchema], default: [] }
  },
  { timestamps: true }
);

export const Navigation = mongoose.models.Navigation ?? mongoose.model('Navigation', navigationSchema);
