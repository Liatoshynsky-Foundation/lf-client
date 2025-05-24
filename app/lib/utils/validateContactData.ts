import { lengths, regex, error } from '~/constants/validation';

export type ContactFormData = {
  name: unknown;
  email: unknown;
  message: unknown;
};

export function validateContactData(data: ContactFormData): string[] {
  const { name, email, message } = data;
  const errors: string[] = [];

  if (
    typeof name !== 'string' ||
    name.length < lengths.NAME_MIN_LENGTH ||
    name.length > lengths.NAME_MAX_LENGTH
  ) {
    errors.push(error.NAME_ERROR);
  }

  if (typeof email !== 'string' || !regex.EMAIL_PATTERN.test(email)) {
    errors.push(error.EMAIL_ERROR);
  }

  if (
    typeof message !== 'string' ||
    message.length < lengths.MESSAGE_MIN_LENGTH ||
    message.length > lengths.MESSAGE_MAX_LENGTH
  ) {
    errors.push(error.MESSAGE_ERROR);
  }

  return errors;
}
