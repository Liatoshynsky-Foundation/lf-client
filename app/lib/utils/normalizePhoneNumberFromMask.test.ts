import { normalizePhoneNumberFromMask } from './normalizePhoneNumberFromMask';

describe('normalizeFromMask', () => {
  it('should remove spaces, parentheses, and dashes; keeps only digits and prefixes +', () => {
    expect(normalizePhoneNumberFromMask('+380 (63) 116-46-327')).toBe('+3806311646327');
  });
});
