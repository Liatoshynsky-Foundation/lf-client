import { model, models, Schema } from 'mongoose';

const baseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true }
  },
  {
    discriminatorKey: 'slug',
    timestamps: true
  }
);

export const FoundationInfo = models.FoundationInfo ?? model('FoundationInfo', baseSchema);
