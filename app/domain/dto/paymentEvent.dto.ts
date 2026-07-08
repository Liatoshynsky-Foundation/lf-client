import type { WayForPayCallbackDTO } from './wayForPayCallback.dto';

export interface PaymentEventDTO {
  orderReference: string;
  transactionStatus: string;
  authCode: string;
  reasonCode: number | string | null;
  payload: WayForPayCallbackDTO;
}
