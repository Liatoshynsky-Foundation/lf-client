import type { RawPaymentDetailsDTO } from '~/domain/dto/paymentDetails.dto';

export interface PaymentDetailsRepository {
  getPaymentDetails(): Promise<RawPaymentDetailsDTO | null>;
}
