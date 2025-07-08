import { z } from 'zod';

export const PageItemSchema = z.object({
  type: z.literal('page'),
  page: z.number()
});
