import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema(
  {
    componentName: { type: String, required: true }
  },
  {
    discriminatorKey: 'blockType',
    collection: 'blocks',
    timestamps: true
  }
);

export default mongoose.models.Block ?? mongoose.model('Block', blockSchema);
