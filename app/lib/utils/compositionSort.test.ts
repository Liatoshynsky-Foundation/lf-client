import { compareLang, compareOpus, compositionSort, isLatin, parseOpus } from './compositionSort';
import { Composition, Opus } from '~/types/types/composition.types';

const createComposition = (params: Partial<Composition>): Composition => {
  return {
    title: params.title ?? 'A',
    year: params.year ?? 1800,
    opus: params.opus
  } as Composition;
};

describe('Composition sorting function', () => {
  describe('Sorting logic', () => {
    it('should sort by opus presence (those with opus come before those without)', () => {
      const compWithOpus = createComposition({
        opus: { number: 'Op. 5' } as Opus
      });
      const compWithoutOpus = createComposition({});

      const sorted = compositionSort([compWithoutOpus, compWithOpus]);
      expect(sorted).toEqual([compWithOpus, compWithoutOpus]);
    });

    it('should sort by year of writing (ascending order)', () => {
      const comp1800 = createComposition({
        year: 1800,
        opus: { number: 'Op. 5' } as Opus
      });
      const comp1810 = createComposition({
        year: 1810,
        opus: { number: 'Op. 5' } as Opus
      });
      const sorted = compositionSort([comp1810, comp1800]);
      expect(sorted).toEqual([comp1800, comp1810]);
    });

    it('should sort by opus number when years are equal', () => {
      const compOp10 = createComposition({
        opus: { number: 'Op. 10' } as Opus
      });
      const compOp20 = createComposition({
        opus: { number: 'Op. 20' } as Opus
      });
      const sorted = compositionSort([compOp20, compOp10]);
      expect(sorted).toEqual([compOp10, compOp20]);
    });

    it('should sort by bis flag when opus numbers are equal', () => {
      const compNoBis = createComposition({
        opus: { number: 'Op. 25' } as Opus
      });
      const compBis = createComposition({
        opus: { number: 'Op. 25 bis' } as Opus
      });

      const sorted = compositionSort([compBis, compNoBis]);
      expect(sorted).toEqual([compNoBis, compBis]);
    });

    it('should sort by title language when opus and year are equal', () => {
      const compA = createComposition({
        title: 'Місячна'
      });
      const compB = createComposition({
        title: 'Moonlight'
      });

      const sorted = compositionSort([compB, compA]);
      expect(sorted).toEqual([compA, compB]);
    });

    it('should sort compositions in reverse order', () => {
      const comp1 = createComposition({
        opus: { number: 'Op. 25' } as Opus
      });
      const comp2 = createComposition({});
      const comp3 = createComposition({
        opus: { number: 'Op. 25 bis' } as Opus
      });
      const sorted = compositionSort([comp1, comp2, comp3], true);

      expect(sorted).toEqual([comp2, comp3, comp1]);
    });
  });

  describe('compareOpus', () => {
    it('should return a negative number when first opus is less than second', () => {
      expect(compareOpus('Op. 10', 'Op. 20')).toBeLessThan(0);
    });

    it('should return a positive number when first opus is greater than second', () => {
      expect(compareOpus('Op. 30', 'Op. 20')).toBeGreaterThan(0);
    });

    it('should return 0 when opus numbers match exactly', () => {
      expect(compareOpus('Op. 25', 'Op. 25')).toBe(0);
    });

    it('should consider the "bis" flag so that an opus with "bis" comes later', () => {
      expect(compareOpus('Op. 25 bis', 'Op. 25')).toBeGreaterThan(0);
      expect(compareOpus('Op. 25', 'Op. 25 bis')).toBeLessThan(0);
    });

    it('should throw an error for invalid opus numbers', () => {
      expect(() => compareOpus('Op. not a number', 'Op. 25')).toThrow();
      expect(() => compareOpus('Op. 25', 'Op. not a number')).toThrow();
    });
  });

  describe('compareLang', () => {
    it('should return 1 when first string is Latin and second is not', () => {
      expect(compareLang('Moonlight', 'Місячна')).toBeGreaterThan(0);
    });

    it('should return -1 when first string is not Latin and second is Latin', () => {
      expect(compareLang('Місячна', 'Moonlight')).toBeLessThan(0);
    });

    it('should use localeCompare when both strings are of the same alphabet type', () => {
      const result = 'Apple'.localeCompare('Banana');
      expect(compareLang('Apple', 'Banana')).toBe(result);
    });
  });

  describe('parseOpus', () => {
    it('should parse opus correctly', () => {
      expect(parseOpus('Op. 25')).toBe(25);
      expect(parseOpus('Op. 10')).toBe(10);
      expect(parseOpus('Op. 100 bis')).toBe(100);
      expect(parseOpus('Op. not a number')).toBeNull();
    });
  });

  describe('isLatin', () => {
    it('should identify Latin text correctly', () => {
      expect(isLatin('Місячна')).toBe(false);
      expect(isLatin('Місячна Соната, 1-ший рух')).toBe(false);
      expect(isLatin('Moonlight')).toBe(true);
      expect(isLatin('')).toBe(false);
      expect(isLatin('12345')).toBe(false);
    });
  });
});
