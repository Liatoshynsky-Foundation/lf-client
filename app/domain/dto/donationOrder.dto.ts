export enum DonationOrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Declined = 'Declined',
  Expired = 'Expired',
  InProcessing = 'InProcessing'
}

export enum PaymentProvider {
  WayForPay = 'WayForPay'
}

export interface DonationOrderDTO {
  orderReference: string;
  amount: number;
  currency: string;
  status: DonationOrderStatus;
  language: 'UA' | 'EN';

  paidAt?: Date | null;
  paymentProvider?: PaymentProvider | null;
  providerTxnId?: string | null;

  reasonCode?: string | number | null;
  reason?: string | null;

  productName: string[];
  productCount: number[];
  productPrice: number[];
}
