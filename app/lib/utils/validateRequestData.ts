import { z, ZodTypeAny } from 'zod';

export function validateRequestData<T>(
  data: T,
  validationFunction: (data: T) => string[]
): { errors: string[]; valid: false } | { valid: true; value: T } {
  const errors = validationFunction(data);

  return errors.length === 0 ? { valid: true, value: data } : { errors, valid: false };
}

export function validateWithZod<T extends ZodTypeAny>(
  data: unknown,
  schema: T
): { valid: true; value: z.infer<T> } | { valid: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { valid: true, value: result.data };
  } else {
    const errors = result.error.errors.map((e) => e.message);
    return { valid: false, errors };
  }
}
