import mongoose, { Document, Schema } from 'mongoose';

import type { PaymentEventDTO } from '~/domain/dto/paymentEvent.dto';

export interface IPaymentEventDocument extends PaymentEventDTO, Document {}

const paymentEventSchema = new Schema<IPaymentEventDocument>(
  {
    orderReference: {
      type: String,
      required: true
    },

    transactionStatus: {
      type: String,
      required: true
    },

    authCode: {
      type: String,
      required: true,
      default: ''
    },

    reasonCode: {
      type: Schema.Types.Mixed,
      default: null
    },

    payload: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
);

paymentEventSchema.index(
  {
    orderReference: 1,
    transactionStatus: 1,
    authCode: 1
  },
  {
    unique: true,
    name: 'uniq_orderStatusAuth'
  }
);

const PaymentEventModel =
  mongoose.models.PaymentEvent || mongoose.model<IPaymentEventDocument>('PaymentEvent', paymentEventSchema);

export default PaymentEventModel;
