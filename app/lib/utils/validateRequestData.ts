export function validateRequestData<T>(
  data: T,
  validationFunction: (data: T) => string[]
): { errors: string[]; valid: false } | { valid: true; value: T } {
  const errors = validationFunction(data);

  return errors.length === 0 ? { valid: true, value: data } : { errors, valid: false };
}
