import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const bulletedListElementSchema = new mongoose.Schema({
  items: [translatedFieldSchema]
});

export default bulletedListElementSchema;
