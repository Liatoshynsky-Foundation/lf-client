import { validateContactData } from '~/lib/utils/validateContactData';
import { error, lengths } from '~/constants/validation';

describe('validateContactData', () => {
  it('should return no errors for valid input', () => {
    const result = validateContactData({
      name: 'John',
      email: 'john@example.com',
      message: 'This is a valid message.',
    });

    expect(result).toEqual([]);
  });

  it('should return error if name is missing', () => {
    const result = validateContactData({
      name: undefined,
      email: 'john@example.com',
      message: 'Valid message',
    });

    expect(result).toContain(error.NAME_ERROR);
  });

  it('should return error if name is too short', () => {
    const result = validateContactData({
      name: 'A',
      email: 'john@example.com',
      message: 'Valid message',
    });

    expect(result).toContain(error.NAME_ERROR);
  });

  it('should return error if name is too long', () => {
    const result = validateContactData({
      name: 'A'.repeat(lengths.NAME_MAX_LENGTH + 1),
      email: 'john@example.com',
      message: 'Valid message',
    });

    expect(result).toContain(error.NAME_ERROR);
  });

  it('should return error if email is missing', () => {
    const result = validateContactData({
      name: 'John',
      email: undefined,
      message: 'Valid message',
    });

    expect(result).toContain(error.EMAIL_ERROR);
  });

  it('should return error if email is invalid', () => {
    const result = validateContactData({
      name: 'John',
      email: 'invalid-email',
      message: 'Valid message',
    });

    expect(result).toContain(error.EMAIL_ERROR);
  });

  it('should return error if message is missing', () => {
    const result = validateContactData({
      name: 'John',
      email: 'john@example.com',
      message: undefined,
    });

    expect(result).toContain(error.MESSAGE_ERROR);
  });

  it('should return error if message is too short', () => {
    const result = validateContactData({
      name: 'John',
      email: 'john@example.com',
      message: 'Too short',
    });

    expect(result).toContain(error.MESSAGE_ERROR);
  });

  it('should return error if message is too long', () => {
    const result = validateContactData({
      name: 'John',
      email: 'john@example.com',
      message: 'A'.repeat(lengths.MESSAGE_MAX_LENGTH + 1),
    });

    expect(result).toContain(error.MESSAGE_ERROR);
  });

  it('should return multiple errors if all fields are invalid', () => {
    const result = validateContactData({
      name: '',
      email: 'invalid',
      message: '',
    });

    expect(result).toContain(error.NAME_ERROR);
    expect(result).toContain(error.EMAIL_ERROR);
    expect(result).toContain(error.MESSAGE_ERROR);
  });
});
