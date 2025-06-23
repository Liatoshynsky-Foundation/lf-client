export const createEnvErrors = (field: string) => ({
  REQUIRED: `${field} is required`,
  INVALID: `${field} must be a string`,
  EMPTY: `${field} cannot be empty`
});

export const createBlobErrors = (field: string) => {
  return `Error during ${field} blob file`;
};

export const createCredentialsErrors = (serviceName: string, ...fields: string[]): string => {
  const readableFields = fields.length === 1 ? fields[0] : fields.slice(0, -1).join(', ') + ' and ' + fields.at(-1);

  return `${readableFields} are required for ${serviceName} connections`;
};
