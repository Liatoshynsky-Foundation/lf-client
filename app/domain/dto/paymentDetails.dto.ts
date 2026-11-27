import type { JSONContent } from '@tiptap/react';

export interface PaymentDetailsTabDTO {
  id: string;
  name: string;
  content: JSONContent;
  order: number;
}

export interface RawPaymentDetailsDTO {
  tabs?: unknown[];
}
