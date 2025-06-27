import mongoose from 'mongoose';

const translatedFieldSchema = new mongoose.Schema(
  {
    uk: { type: String, required: true },
    en: { type: String, required: true }
  },
  { _id: false }
);

export default translatedFieldSchema;
