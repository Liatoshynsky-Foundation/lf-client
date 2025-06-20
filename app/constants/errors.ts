import { lengths } from './validation';

import { createCredentialsErrors, createEnvErrors } from '~/lib/utils/errorHelper';

export const errors = {
  NAME_ERROR: `Name must be a string between ${lengths.NAME_MIN_LENGTH} and ${lengths.NAME_MAX_LENGTH} characters long.`,
  EMAIL_ERROR: 'Invalid email address.',
  MESSAGE_ERROR: `Message must be a string between ${lengths.MESSAGE_MIN_LENGTH} and ${lengths.MESSAGE_MAX_LENGTH} characters.`,
  MISSING_MONGO_URL: '❌ mongoUrl is not defined or is empty',
  FAILED_TO_CONNECT_DB: '❌ Failed to connect to the database'
};

export const envErrors = {
  MONGO_DB: createEnvErrors('MONGO_DB'),
  MONGO_HOST: createEnvErrors('MONGO_HOST'),
  MONGO_USERNAME: createEnvErrors('MONGO_USERNAME'),
  MONGO_PASSWORD: createEnvErrors('MONGO_PASSWORD'),
  STORAGE_ACCOUNT: createEnvErrors('STORAGE_ACCOUNT'),
  SAS_TOKEN: createEnvErrors('SAS_TOKEN'),

  MONGO_PORT_INVALID: 'MONGO_PORT must be a valid number',

  MONGO_CREDENTIALS_REQUIRED: createCredentialsErrors('Mongo', 'MONGO_USERNAME', 'MONGO_PASSWORD'),
  AZURE_CREDENTIALS_REQUIRED: createCredentialsErrors('Azure', 'STORAGE_ACCOUNT', 'SAS_TOKEN')
};
