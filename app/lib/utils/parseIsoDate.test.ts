import { parseIsoDate } from './parseIsoDate';

describe('parseIsoDate', () => {
  it('returns day, month, year for a plain ISO date', () => {
    const result = parseIsoDate('2025-02-09');

    expect(result).toEqual({
      day: '09',
      month: '02',
      year: '2025'
    });
  });

  it('parses an ISO date with time and timezone (uses only the date part)', () => {
    const result = parseIsoDate('2025-02-09T10:15:30Z');

    expect(result).toEqual({
      day: '09',
      month: '02',
      year: '2025'
    });
  });

  it('trims leading and trailing whitespace', () => {
    const result = parseIsoDate('   2024-11-30   ');

    expect(result).toEqual({
      day: '30',
      month: '11',
      year: '2024'
    });
  });

  it('returns null for an empty string', () => {
    const result = parseIsoDate('');

    expect(result).toBeNull();
  });

  it('returns null for a whitespace-only string', () => {
    const result = parseIsoDate('   \n\t  ');

    expect(result).toBeNull();
  });

  it('returns null for null', () => {
    const result = parseIsoDate(null);

    expect(result).toBeNull();
  });

  it('returns null for undefined', () => {
    const result = parseIsoDate(undefined);

    expect(result).toBeNull();
  });

  it('returns null for a non-ISO string', () => {
    const result = parseIsoDate('not-a-date');

    expect(result).toBeNull();
  });

  it('returns null when segments are missing (e.g. "YYYY-MM")', () => {
    const result = parseIsoDate('2025-02');

    expect(result).toBeNull();
  });

  it('is tolerant to extra trailing characters after the date', () => {
    const result = parseIsoDate('2023-07-15-extra-stuff');

    expect(result).toEqual({
      day: '15',
      month: '07',
      year: '2023'
    });
  });
});
