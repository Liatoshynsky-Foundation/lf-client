import mongoose from 'mongoose';

import Block from './blockBase';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

const TeamMemberSchema = new mongoose.Schema(
  {
    imageName: { type: String, required: true },
    name: translatedFieldSchema,
    description: translatedFieldSchema
  },
  { _id: false }
);

const teamBlockSchema = new mongoose.Schema({
  content: {
    introText: translatedFieldSchema,
    sectionTitle: translatedFieldSchema,
    members: [TeamMemberSchema]
  }
});

const TeamBlock = Block.discriminator('TeamBlock', teamBlockSchema);
export default TeamBlock;
