import { parseGenreString } from './parseGenreString';

describe('parseGenreString', () => {
  it('should parse a comma-separated string into an array of trimmed genres', () => {
    expect(parseGenreString('rock, pop, jazz')).toEqual(['rock', 'pop', 'jazz']);
  });

  it('should return an empty array if input is null', () => {
    expect(parseGenreString(null)).toEqual([]);
  });

  it('should return an empty array if input is undefined', () => {
    expect(parseGenreString(undefined)).toEqual([]);
  });

  it('should return an empty array if input is not a string', () => {
    // @ts-expect-error testing invalid runtime input
    expect(parseGenreString(123)).toEqual([]);
  });

  it('should filter out empty strings after trimming', () => {
    expect(parseGenreString('rock, , pop,')).toEqual(['rock', 'pop']);
  });
});
