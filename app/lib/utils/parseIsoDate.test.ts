import { formatIsoDateToDdMmYy, parseIsoDate } from './parseIsoDate';

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

  it('parses YYYY-MM as the first day of that month', () => {
    const result = parseIsoDate('2025-02');

    expect(result).toEqual({ day: '01', month: '02', year: '2025' });
  });

  it('returns null for a date string with unrecognised trailing characters', () => {
    const result = parseIsoDate('2023-07-15-extra-stuff');

    expect(result).toBeNull();
  });
});

describe('formatIsoDateToDdMmYy', () => {
  it('formats a plain ISO date to dd.MM.yy', () => {
    const result = formatIsoDateToDdMmYy('2025-05-05');

    expect(result).toBe('05.05.25');
  });

  it('formats an ISO date with time to dd.MM.yy', () => {
    const result = formatIsoDateToDdMmYy('2025-05-05T10:15:30Z');

    expect(result).toBe('05.05.25');
  });

  it('trims whitespace before formatting', () => {
    const result = formatIsoDateToDdMmYy('  2024-01-09  ');

    expect(result).toBe('09.01.24');
  });

  it('returns null for invalid date strings', () => {
    expect(formatIsoDateToDdMmYy('not-a-date')).toBeNull();
    expect(formatIsoDateToDdMmYy('2023-07-15-extra-stuff')).toBeNull();
    expect(formatIsoDateToDdMmYy('')).toBeNull();
    expect(formatIsoDateToDdMmYy('   ')).toBeNull();
    expect(formatIsoDateToDdMmYy(null)).toBeNull();
    expect(formatIsoDateToDdMmYy(undefined)).toBeNull();
  });

  it('formats YYYY-MM as the first day of that month', () => {
    expect(formatIsoDateToDdMmYy('2025-02')).toBe('01.02.25');
  });
});
