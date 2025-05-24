import { lengths } from './validation';

export const errors = {
  NAME_ERROR: `Name must be a string between ${lengths.NAME_MIN_LENGTH} and ${lengths.NAME_MAX_LENGTH} characters long.`,
  EMAIL_ERROR: 'Invalid email address.',
  MESSAGE_ERROR: `Message must be a string between ${lengths.MESSAGE_MIN_LENGTH} and ${lengths.MESSAGE_MAX_LENGTH} characters.`,
};
