import { lengths, regex } from '~/constants/validation';
import { errors } from '~/constants/errors';

export type ContactFormData = {
  name: unknown;
  email: unknown;
  message: unknown;
};

export function validateContactData(data: ContactFormData): string[] {
  const { name, email, message } = data;
  const errorsMessages: string[] = [];

  if (
    typeof name !== 'string' ||
    name.length < lengths.NAME_MIN_LENGTH ||
    name.length > lengths.NAME_MAX_LENGTH
  ) {
    errorsMessages.push(errors.NAME_ERROR);
  }

  if (typeof email !== 'string' || !regex.EMAIL_PATTERN.test(email)) {
    errorsMessages.push(errors.EMAIL_ERROR);
  }

  if (
    typeof message !== 'string' ||
    message.length < lengths.MESSAGE_MIN_LENGTH ||
    message.length > lengths.MESSAGE_MAX_LENGTH
  ) {
    errorsMessages.push(errors.MESSAGE_ERROR);
  }

  return errorsMessages;
}
