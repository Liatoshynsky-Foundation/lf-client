export interface WayForPayCallbackDTO {
  merchantAccount: string;
  orderReference: string;
  amount: number;
  currency: string;

  authCode?: string;
  cardPan?: string;

  transactionStatus: string;
  reasonCode: number | string;
  reason?: string;

  merchantSignature: string;
}
