import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const headingElementSchema = new mongoose.Schema({
  text: {
    type: translatedFieldSchema,
    required: true
  }
});

export default headingElementSchema;
