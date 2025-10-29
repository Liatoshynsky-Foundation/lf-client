import { model, models, Schema } from 'mongoose';

export interface IPaymentEvent {
  orderReference: string;
  transactionStatus: string;
  authCode: string;
  reasonCode: string | number | null;
  payload: any;
}

const schema = new Schema<IPaymentEvent>(
  {
    orderReference: { type: String, required: true, index: true },
    transactionStatus: { type: String, required: true },
    authCode: { type: String, required: true, default: '' },
    reasonCode: { type: Schema.Types.Mixed, default: null },
    payload: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

schema.index({ orderReference: 1, transactionStatus: 1, authCode: 1 }, { unique: true, name: 'uniq_orderStatusAuth' });

export const PaymentEvent = models.PaymentEvent || model<IPaymentEvent>('PaymentEvent', schema);
