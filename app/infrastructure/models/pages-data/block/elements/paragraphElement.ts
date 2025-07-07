import mongoose from 'mongoose';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const paragraphElementSchema = new mongoose.Schema({
  text: translatedFieldSchema
});

export default paragraphElementSchema;
