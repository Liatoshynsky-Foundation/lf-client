import { model, models, Schema } from 'mongoose';

export type TDonationOrderStatus = 'Pending' | 'Paid' | 'Declined' | 'Expired' | 'InProcessing';

export interface IDonationOrder {
  orderReference: string;
  amount: number;
  currency: string;
  status: TDonationOrderStatus;
  language: 'UA' | 'EN';
  paidAt?: Date | null;
  paymentProvider?: 'WayForPay';
  providerTxnId?: string | null; // authCode
  reasonCode?: string | number | null;
  reason?: string | null;
  productName: string[];
  productCount: number[];
  productPrice: number[];
}

const schema = new Schema<IDonationOrder>(
  {
    orderReference: { type: String, required: true, unique: true, index: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Paid', 'Declined', 'Expired', 'InProcessing'], default: 'Pending' },
    language: { type: String, enum: ['UA', 'EN'], required: true },
    paidAt: { type: Date, default: null },
    paymentProvider: { type: String, default: 'WayForPay' },
    providerTxnId: { type: String, default: null },
    reasonCode: { type: Schema.Types.Mixed, default: null },
    reason: { type: String, default: null },
    productName: { type: [String], required: true },
    productCount: { type: [Number], required: true },
    productPrice: { type: [Number], required: true }
  },
  { timestamps: true }
);

export const DonationOrder = models.DonationOrder || model<IDonationOrder>('DonationOrder', schema);
