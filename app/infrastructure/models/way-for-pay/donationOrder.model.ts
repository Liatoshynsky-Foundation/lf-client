import mongoose, { Document, Model, Schema } from 'mongoose';

import { DonationOrderDTO, DonationOrderStatus, PaymentProvider } from '~/domain/dto/donationOrder.dto';

export interface IDonationOrderDocument extends DonationOrderDTO, Document {}

const donationOrderSchema = new Schema<IDonationOrderDocument>(
  {
    orderReference: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    currency: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: Object.values(DonationOrderStatus),
      required: true,
      default: DonationOrderStatus.Pending
    },

    language: {
      type: String,
      enum: ['UA', 'EN'],
      required: true
    },

    paidAt: {
      type: Date,
      default: null
    },

    paymentProvider: {
      type: String,
      enum: Object.values(PaymentProvider),
      default: null
    },

    providerTxnId: {
      type: String,
      default: null
    },

    reasonCode: {
      type: Schema.Types.Mixed,
      default: null
    },

    reason: {
      type: String,
      default: null
    },

    productName: {
      type: [String],
      required: true
    },

    productCount: {
      type: [Number],
      required: true
    },

    productPrice: {
      type: [Number],
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'donationorders'
  }
);

const DonationOrderModel: Model<IDonationOrderDocument> =
  mongoose.models.DonationOrder || mongoose.model<IDonationOrderDocument>('DonationOrder', donationOrderSchema);

export default DonationOrderModel;
