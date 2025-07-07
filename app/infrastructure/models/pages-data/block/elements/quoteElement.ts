import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const quoteElementSchema = new mongoose.Schema({
  text: translatedFieldSchema,
  author: translatedFieldSchema
});

export default quoteElementSchema;
