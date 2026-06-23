import { z } from 'zod';

export const parseArraySafely = <T>(items: unknown[], schema: z.ZodSchema<T>) => {
  const validItems: T[] = [];
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
