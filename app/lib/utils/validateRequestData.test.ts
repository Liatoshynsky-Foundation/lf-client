import { validateRequestData } from './validateRequestData';

describe('validateRequestData', () => {
  const mockValidationFn = jest.fn();

  beforeEach(() => {
    mockValidationFn.mockReset();
  });

  it('should return valid: true and the value when there are no validation errors', () => {
    const data = { name: 'John' };
    mockValidationFn.mockReturnValue([]);

    const result = validateRequestData(data, mockValidationFn);

    expect(result).toEqual({ valid: true, value: data });
    expect(mockValidationFn).toHaveBeenCalledWith(data);
  });

  it('should return valid: false and the errors when validation fails', () => {
    const data = { name: '' };
    mockValidationFn.mockReturnValue(['Name is required']);

    const result = validateRequestData(data, mockValidationFn);

    expect(result).toEqual({
      valid: false,
      errors: ['Name is required']
    });
    expect(mockValidationFn).toHaveBeenCalledWith(data);
  });

  it('should handle multiple validation errors', () => {
    const data = { name: '', email: 'invalid-email' };
    mockValidationFn.mockReturnValue(['Name is required', 'Email format is invalid']);

    const result = validateRequestData(data, mockValidationFn);

    expect(result).toEqual({
      valid: false,
      errors: ['Name is required', 'Email format is invalid']
    });
    expect(mockValidationFn).toHaveBeenCalledWith(data);
  });
});
