import { normalizePhoneNumberFromMask } from './normalizePhoneNumberFromMask';

describe('normalizePhoneNumberFromMask', () => {
  it('should parse masked layout formats and correctly prepend prefix characters cleanly', () => {
    expect(normalizePhoneNumberFromMask('+38 (097) 123-45-67')).toBe('+380971234567');
  });

  it('should successfully filter out any random non numeric standalone character configurations', () => {
    expect(normalizePhoneNumberFromMask('380-abc-971-xyz')).toBe('+380971');
  });

  it('should evaluate conditional fallback parameters and return undefined if type matching completely breaks string criteria', () => {
    expect(normalizePhoneNumberFromMask(undefined)).toBeUndefined();
    expect(normalizePhoneNumberFromMask(null)).toBeUndefined();
    expect(normalizePhoneNumberFromMask(12345)).toBeUndefined();
    expect(normalizePhoneNumberFromMask({ phone: '380' })).toBeUndefined();
  });

  it('should return undefined when input string parameter resolves to empty layouts or contains zero numerical symbols', () => {
    expect(normalizePhoneNumberFromMask('')).toBeUndefined();
    expect(normalizePhoneNumberFromMask('abc-xyz')).toBeUndefined();
  });
});
