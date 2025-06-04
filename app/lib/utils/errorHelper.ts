export const createEnvErrors = (field: string) => ({
  REQUIRED: `${field} is required`,
  INVALID: `${field} must be a string`,
  EMPTY: `${field} cannot be empty`,
});