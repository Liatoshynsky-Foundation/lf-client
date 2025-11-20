import { errors } from '~/constants/errors';
import { lengths, regex } from '~/constants/validation';

export type ContactFormData = {
  name: unknown;
  email: unknown;
  phoneNumber?: unknown;
  message: unknown;
};

export function validateContactData(data: ContactFormData): string[] {
  const { name, email, phoneNumber, message } = data;
  const errorsMessages: string[] = [];

  if (typeof name !== 'string' || name.length < lengths.NAME_MIN_LENGTH || name.length > lengths.NAME_MAX_LENGTH) {
    errorsMessages.push(errors.NAME_ERROR);
  }

  if (typeof email !== 'string' || !regex.EMAIL_PATTERN.test(email)) {
    errorsMessages.push(errors.EMAIL_ERROR);
  }

  if (phoneNumber) {
    if (
      typeof phoneNumber !== 'string' ||
      !regex.PHONE_NUMBER_PATTERN.test(phoneNumber) ||
      phoneNumber.length < lengths.PHONE_NUMBER_MIN_LENGTH ||
      phoneNumber.length > lengths.PHONE_NUMBER_MAX_LENGTH
    ) {
      errorsMessages.push(errors.PHONE_NUMBER_ERROR);
    }
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
