import { model, models, Schema } from 'mongoose';

export interface IWayforPayCallbackPayload {
  merchantAccount: string;
  orderReference: string;
  merchantSignature: string;
  amount: number | string;
  currency: string;
  transactionStatus: string;
  reasonCode: string | number;
  reason?: string;

  authCode?: string;
  cardPan?: string;
  email?: string;
  phone?: string;
  createdDate?: number;
  processingDate?: number;
  cardType?: string;
  issuerBankCountry?: string;
  issuerBankName?: string;
  recToken?: string;
  fee?: number;
  paymentSystem?: string;
  repayUrl?: string;
  [key: string]: unknown;
}

export interface IPaymentEvent {
  orderReference: string;
  transactionStatus: string;
  authCode: string;
  reasonCode: string | number | null;
  payload: IWayforPayCallbackPayload;
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
