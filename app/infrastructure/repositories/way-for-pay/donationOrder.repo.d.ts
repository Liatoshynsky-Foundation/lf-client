import { DonationOrderDTO, DonationOrderStatus, PaymentProvider } from '~/domain/dto/donationOrder.dto';

export interface CreateDonationOrderInput {
  orderReference: string;
  amount: number;
  currency: string;
  language: 'UA' | 'EN';

  productName: string[];
  productCount: number[];
  productPrice: number[];
}

export interface UpdateDonationOrderStatusInput {
  orderReference: string;
  status: DonationOrderStatus;

  paidAt?: Date;
  paymentProvider?: PaymentProvider | null;
  providerTxnId?: string | null;

  reasonCode?: string | number | null;
  reason?: string | null;
}

export interface DonationOrderRepository {
  create(input: CreateDonationOrderInput): Promise<DonationOrderDTO>;

  findByOrderReference(orderReference: string): Promise<DonationOrderDTO | null>;

  updateStatus(input: UpdateDonationOrderStatusInput): Promise<void>;
}
