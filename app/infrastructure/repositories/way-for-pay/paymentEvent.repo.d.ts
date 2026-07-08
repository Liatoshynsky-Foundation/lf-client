import type { PaymentEventDTO } from '~/domain/dto/paymentEvent.dto';

export interface CreatePaymentEventInput {
  orderReference: string;
  transactionStatus: string;
  authCode: string;
  reasonCode: string | number | null;
  payload: PaymentEventDTO['payload'];
}

export interface PaymentEventRepository {
  createIfNotExists(input: CreatePaymentEventInput): Promise<boolean>;
}
