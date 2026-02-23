import { lengths } from './validation';

import { createBlobErrors, createCredentialsErrors, createEnvErrors } from '~/lib/utils/errorHelper';

export const errors = {
  NAME_ERROR: `Name must be a string between ${lengths.NAME_MIN_LENGTH} and ${lengths.NAME_MAX_LENGTH} characters long.`,
  EMAIL_ERROR: 'Invalid email address.',
  PHONE_NUMBER_ERROR: 'Invalid phone number',
  MESSAGE_ERROR: `Message must be a string between ${lengths.MESSAGE_MIN_LENGTH} and ${lengths.MESSAGE_MAX_LENGTH} characters.`,
  MISSING_MONGO_URL: '❌ mongoUrl is not defined or is empty',
  FAILED_TO_CONNECT_DB: '❌ Failed to connect to the database',
  FAILED_TO_UPLOAD_BLOB: createBlobErrors('upload'),
  FAILED_TO_DELETE_BLOB: createBlobErrors('delete'),
  FAILED_TO_GET_BLOB: createBlobErrors('get'),
  BLOB_DOES_NOT_EXIST: 'Blob with this name does not exist',
  AZURE_URL_NOT_DEFINED: 'AZURE_SAS_URL environment variable is not defined',
  REQUEST_TIMEOUT: {
    code: 'REQUEST_TIMEOUT',
    message: 'Request timed out'
  },
  MISSING_AUTH_TOKEN: 'Missing access token in cookies',
  INVALID_TOKEN: 'Invalid token',
  ACCESS_DENIED: 'Access denied: not admin',
  MISSING_PARAMETERS: 'Missing required query parameters',
  INVALID_PREVIEW_TOKEN: 'Invalid preview token',
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    status: 400
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'Internal server error',
    status: 500
  },
  COMPOSITION_FETCH_FAILED: {
    code: 'COMPOSITION_FETCH_FAILED',
    message: 'Failed to fetch compositions',
    status: 500
  },
  FILTERS_FETCH_FAILED: {
    code: 'FILTERS_FETCH_FAILED',
    message: 'Failed to fetch filters (titles, years, genres, categories)',
    status: 500
  },
  FUNDS_FETCH_FAILED: {
    code: 'FUNDS_FETCH_FAILED',
    message: 'Failed to fetch funds',
    status: 500
  },
  USE_AUDIO_PLAYER_OUTSIDE_PROVIDER: 'useAudioPlayer must be used within AudioPlayerProvider',
  NOT_FOUND: 'This resource was not found',
  CAPTCHA_FAILED: 'Captcha verification failed'
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

export const loggerErrors = {
  ZOD_VALIDATION_ERROR: 'Zod validation error:',
  UNEXPECTED_HEADER_ERROR: 'Unexpected error in header API:'
};

export const LocalizationErrors = {
  MISSING_UK_ERROR: 'Missing uk translation',
  MISSING_EN_ERROR: 'Missing en translation',
  MISSING_NODE_ERROR: 'Missing node translation'
};
