import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const imageElementSchema = new mongoose.Schema({
  imageName: { type: String, required: true },
  caption: translatedFieldSchema
});

export default imageElementSchema;
