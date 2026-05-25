import mongoose from 'mongoose';

export const translatedFieldSchema = new mongoose.Schema(
  {
    uk: { type: mongoose.Schema.Types.Mixed, required: true },
    en: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { _id: false }
);
