import type { RawPaymentDetailsDTO } from '~/domain/dto/paymentDetails.dto';
import dbConnect from '~/infrastructure/db/connect';
import PaymentDetailsModel from '~/infrastructure/models/payment-details/paymentDetails.model';

const PAYMENT_DETAILS_SLUG = 'payment-details';

const paymentDetailsRepository = {
  async getPaymentDetails(): Promise<RawPaymentDetailsDTO | null> {
    await dbConnect();

    return await PaymentDetailsModel.findOne({ slug: PAYMENT_DETAILS_SLUG })
      .select('tabs')
      .lean<RawPaymentDetailsDTO>();
  }
};

function newPaymentDetailsRepository(): typeof paymentDetailsRepository {
  return paymentDetailsRepository;
}

export default newPaymentDetailsRepository;
