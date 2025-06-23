import { lengths } from './validation';

import { createBlobErrors, createCredentialsErrors, createEnvErrors } from '~/lib/utils/errorHelper';

export const errors = {
  NAME_ERROR: `Name must be a string between ${lengths.NAME_MIN_LENGTH} and ${lengths.NAME_MAX_LENGTH} characters long.`,
  EMAIL_ERROR: 'Invalid email address.',
  MESSAGE_ERROR: `Message must be a string between ${lengths.MESSAGE_MIN_LENGTH} and ${lengths.MESSAGE_MAX_LENGTH} characters.`,
  MISSING_MONGO_URL: '❌ mongoUrl is not defined or is empty',
  FAILED_TO_CONNECT_DB: '❌ Failed to connect to the database',
  FAILED_TO_UPLOAD_BLOB: createBlobErrors('upload'),
  FAILED_TO_DELETE_BLOB: createBlobErrors('delete'),
  FAILED_TO_GET_BLOB: createBlobErrors('get'),
  BLOB_DOES_NOT_EXIST: 'Blob with this name does not exist'
};

export const envErrors = {
  MONGO_DB: createEnvErrors('MONGO_DB'),
  MONGO_HOST: createEnvErrors('MONGO_HOST'),
  MONGO_USERNAME: createEnvErrors('MONGO_USERNAME'),
  MONGO_PASSWORD: createEnvErrors('MONGO_PASSWORD'),
  AZURE_SAS_URL: createEnvErrors('AZURE_SAS_URL'),

  MONGO_PORT_INVALID: 'MONGO_PORT must be a valid number',

  MONGO_CREDENTIALS_REQUIRED: createCredentialsErrors('Mongo', 'MONGO_USERNAME', 'MONGO_PASSWORD'),
  AZURE_CREDENTIALS_REQUIRED: createCredentialsErrors('Azure', 'AZURE_SAS_URL')
};
