import mongoose from 'mongoose';

export const translatedFieldSchema = new mongoose.Schema(
  {
    uk: { type: mongoose.Schema.Types.Mixed, required: true },
    en: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

export const cropSchema = new mongoose.Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  { _id: false }
);

export const carouselImageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  description: { type: translatedFieldSchema, required: true },
  altText: { type: translatedFieldSchema, required: true },
  crop: { type: cropSchema, default: null }
});
