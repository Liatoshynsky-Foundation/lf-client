import { namedFilterHelper, searchHelper, yearHelper } from './searchAndFiltersHelpers';

jest.mock('./escapeRegex', () => ({
  escapeRegex: jest.fn((str: string) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
}));

describe('searchAndFiltersHelpers', () => {
  describe('searchHelper', () => {
    it('should return null when search string is completely undefined or falsy', () => {
      expect(searchHelper()).toBeNull();
      expect(searchHelper('')).toBeNull();
    });

    it('should return cleaned expression when valid search term is supplied to helper', () => {
      expect(searchHelper('test-query')).toBe('test\\-query');
    });
  });

  describe('namedFilterHelper', () => {
    it('should return empty array when namedFilter parameters resolve to undefined bounds', () => {
      expect(namedFilterHelper()).toEqual([]);
    });

    it('should filter out falsy elements from array mapping blocks flawlessly', () => {
      const dirtyFilters = ['author1', '', 'author2', ''];
      expect(namedFilterHelper(dirtyFilters)).toEqual(['author1', 'author2']);
    });
  });

  describe('yearHelper', () => {
    it('should fallback to baseline limits if years parameters layer object is empty or falsy', () => {
      const result = yearHelper();
      expect(result.min).toBe(1900);
      expect(result.max).toBe(new Date().getFullYear());
    });

    it('should accept custom dynamic boundaries when passing target parameters structure', () => {
      const customRange = { min: 1950, max: 2010 };
      expect(yearHelper(customRange)).toEqual({ min: 1950, max: 2010 });
    });
  });
});
