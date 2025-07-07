import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const TitledListItemSchema = new mongoose.Schema(
  {
    title: translatedFieldSchema,
    description: translatedFieldSchema
  },
  { _id: false }
);

const titledListElementSchema = new mongoose.Schema({
  items: [TitledListItemSchema]
});

export default titledListElementSchema;
