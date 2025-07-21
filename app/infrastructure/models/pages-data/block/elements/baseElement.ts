import mongoose from 'mongoose';

const baseElementSchema = new mongoose.Schema(
  {},
  {
    _id: false,
    timestamps: false,
    discriminatorKey: 'elementType'
  }
);

export default baseElementSchema;
