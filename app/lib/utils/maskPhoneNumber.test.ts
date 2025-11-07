import { maskPhoneNumber } from './maskPhoneNumber';

describe('maskPhoneNumber', () => {
  it('formats with operator code and single split when rest length < 9', () => {
    const res = maskPhoneNumber({
      countryCode: '+380',
      nationalNumber: '631164284',
      operatorCodeLength: 2,
      maxPhoneNumberLength: 15,
      separateBy: ' '
    });
    expect(res).toBe('+380 (63) 116 4284');
  });

  it('formats with three groups when rest length >= 9 (last group >= previous)', () => {
    const res = maskPhoneNumber({
      countryCode: '+1',
      nationalNumber: '1234567890',
      operatorCodeLength: 0,
      maxPhoneNumberLength: 15,
      separateBy: ' '
    });
    expect(res).toBe('+1 123 456 7890');

    const res2 = maskPhoneNumber({
      countryCode: '+1',
      nationalNumber: '123456789',
      operatorCodeLength: 0,
      maxPhoneNumberLength: 15,
      separateBy: ' '
    });
    expect(res2).toBe('+1 123 456 789');
  });

  it('uses custom separator "-"', () => {
    const res = maskPhoneNumber({
      countryCode: '+1',
      nationalNumber: '123456789',
      operatorCodeLength: 0,
      maxPhoneNumberLength: 15,
      separateBy: '-'
    });
    expect(res).toBe('+1 123-456-789');
  });

  it('clamps national number to maxPhoneNumberLength (total digits with "+")', () => {
    const res = maskPhoneNumber({
      countryCode: '+380',
      nationalNumber: '1234567890',
      operatorCodeLength: 2,
      maxPhoneNumberLength: 8,
      separateBy: ' '
    });
    expect(res).toBe('+380 (12) 3 4');
  });

  it('handles empty nationalNumber and trims trailing spaces', () => {
    const res = maskPhoneNumber({
      countryCode: '+380',
      nationalNumber: '',
      operatorCodeLength: 2,
      maxPhoneNumberLength: 15,
      separateBy: ' '
    });
    expect(res).toBe('+380');
  });

  it('handles operatorCodeLength > available national digits (uses what exists)', () => {
    const res = maskPhoneNumber({
      countryCode: '+380',
      nationalNumber: '6',
      operatorCodeLength: 2,
      maxPhoneNumberLength: 15,
      separateBy: ' '
    });
    expect(res).toBe('+380 (6)');
  });
});
