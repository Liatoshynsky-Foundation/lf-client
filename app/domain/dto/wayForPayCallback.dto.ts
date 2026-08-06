export enum WayForPayTransactionStatus {
  Approved = 'Approved',
  Declined = 'Declined',
  Expired = 'Expired',
  InProcessing = 'InProcessing'
}
export interface WayForPayCallbackDTO {
  merchantAccount: string;
  orderReference: string;
  amount: number;
  currency: string;

  authCode?: string;
  cardPan?: string;

  transactionStatus: WayForPayTransactionStatus;
  reasonCode: number | string;
  reason?: string;

  merchantSignature: string;
}
