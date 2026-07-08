import { z } from 'zod';

import { WayForPayTransactionStatus } from '~/domain/dto/wayForPayCallback.dto';

export const wayForPayCallbackSchema = z.object({
  merchantAccount: z.string().min(1),
  orderReference: z.string().min(1),

  amount: z.number().positive(),

  currency: z.string().min(1),

  authCode: z.string().optional(),
  cardPan: z.string().optional(),

  transactionStatus: z.nativeEnum(WayForPayTransactionStatus),

  reasonCode: z.union([z.number(), z.string()]),

  reason: z.string().optional(),

  merchantSignature: z.string().length(32)
});

export type WayForPayCallbackSchema = z.infer<typeof wayForPayCallbackSchema>;
