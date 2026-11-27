import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPaymentDetailsDocument extends Document {
  slug: string;
  tabs: {
    name: string;
    content: Record<string, unknown>;
    order: number;
  }[];
}

const paymentDetailsTabSchema = new Schema({
  name: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  order: { type: Number, required: true }
});

const paymentDetailsSchema = new Schema<IPaymentDetailsDocument>(
  {
    slug: { type: String, required: true, unique: true },
    tabs: { type: [paymentDetailsTabSchema], default: [] }
  },
  { collection: 'paymentdetails', strict: false }
);

const PaymentDetailsModel: Model<IPaymentDetailsDocument> =
  mongoose.models.PaymentDetails || mongoose.model<IPaymentDetailsDocument>('PaymentDetails', paymentDetailsSchema);

export default PaymentDetailsModel;
