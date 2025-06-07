import { createEnvErrors } from '~/lib/utils/errorHelper';
import { lengths } from './validation';

export const errors = {
  NAME_ERROR: `Name must be a string between ${lengths.NAME_MIN_LENGTH} and ${lengths.NAME_MAX_LENGTH} characters long.`,
  EMAIL_ERROR: 'Invalid email address.',
  MESSAGE_ERROR: `Message must be a string between ${lengths.MESSAGE_MIN_LENGTH} and ${lengths.MESSAGE_MAX_LENGTH} characters.`,
  MISSING_MONGO_URL: '❌ mongoUrl is not defined or is empty',
  FAILED_TO_CONNECT_DB: '❌ Failed to connect to the database',
};

export const envErrors = {
  MONGO_DB: createEnvErrors('MONGO_DB'),
  MONGO_HOST: createEnvErrors('MONGO_HOST'),
  MONGO_USERNAME: createEnvErrors('MONGO_USERNAME'),
  MONGO_PASSWORD: createEnvErrors('MONGO_PASSWORD'),

  MONGO_PORT_INVALID: 'MONGO_PORT must be a valid number',

  CREDENTIALS_REQUIRED:
    'MONGO_USERNAME and MONGO_PASSWORD are required for non-localhost connections'
};
