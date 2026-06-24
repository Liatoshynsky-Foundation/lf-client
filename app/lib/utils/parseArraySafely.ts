import { z } from 'zod';

export const parseArraySafely = <TSchema extends z.ZodTypeAny>(items: unknown[], schema: TSchema) => {
  const validItems: z.infer<TSchema>[] = [];
  let invalidCount = 0;

  items.forEach((item) => {
    const result = schema.safeParse(item);

    if (result.success) {
      validItems.push(result.data);
    } else {
      invalidCount++;
    }
  });

  return {
    validItems,
    invalidCount
  };
};
