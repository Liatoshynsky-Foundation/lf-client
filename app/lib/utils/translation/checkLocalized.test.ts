import { isLocalized } from './checkLocalized';

describe('isLocalized', () => {
  it('should return true for a valid Localized object', () => {
    const validObj = { en: 'Hello', uk: 'Привіт' };
    expect(isLocalized(validObj)).toBe(true);
  });

  it('should return false when value is null', () => {
    expect(isLocalized(null)).toBe(false);
  });

  it('should return false when value is not an object', () => {
    expect(isLocalized('string')).toBe(false);
    expect(isLocalized(123)).toBe(false);
    expect(isLocalized(true)).toBe(false);
    expect(isLocalized(undefined)).toBe(false);
  });

  it('should return false when missing "en" property', () => {
    const missingEn = { uk: 'Привіт' };
    expect(isLocalized(missingEn)).toBe(false);
  });

  it('should return false when missing "uk" property', () => {
    const missingUk = { en: 'Hello' };
    expect(isLocalized(missingUk)).toBe(false);
  });

  it('should return false when "en" property is not a string', () => {
    const invalidEn = { en: 123, uk: 'Привіт' };
    expect(isLocalized(invalidEn)).toBe(false);
  });

  it('should return false when "uk" property is not a string', () => {
    const invalidUk = { en: 'Hello', uk: true };
    expect(isLocalized(invalidUk)).toBe(false);
  });
});
