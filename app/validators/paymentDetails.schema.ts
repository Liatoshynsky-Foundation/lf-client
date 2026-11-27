import type { JSONContent } from '@tiptap/react';
import { z } from 'zod';

export const paymentDetailsTabSchema = z
  .object({
    _id: z.unknown().refine((value) => value !== null && value !== undefined),
    name: z.string(),
    content: z.object({ type: z.literal('doc') }).passthrough(),
    order: z.number()
  })
  .transform(({ _id, name, content, order }) => ({
    id: String(_id),
    name: name.trim(),
    content: content as JSONContent,
    order
  }));
