import { compositionSort, isLatin, parseOpus } from './compositionSort';
import { Composition, Opus } from '~/types/types/composition.types';

const createComposition = (params: Partial<Composition>): Composition => {
  return {
    title: params.title || '',
    year: params.year || 0,
    opus: params.opus
  } as Composition;
};

describe('Composition sorting function', () => {
  describe('Helpers', () => {
    it('should parse opus correctly', () => {
      expect(parseOpus('Op. 25')).toBe(25);
      expect(parseOpus('Op. 10')).toBe(10);
      expect(parseOpus('Op. 100 bis')).toBe(100);
      expect(parseOpus('Op. not a number')).toBeNull();
    });

    it('should identify Latin text correctly', () => {
      expect(isLatin('Місячна')).toBe(false);
      expect(isLatin('Місячна Соната, 1-ший рух')).toBe(false);
      expect(isLatin('Moonlight')).toBe(true);
      expect(isLatin('')).toBe(false);
      expect(isLatin('12345')).toBe(false);
    });
  });

  describe('Sorting logic', () => {
    it('should sort by opus presence (those with opus come before those without)', () => {
      const compWithOpus = createComposition({
        title: 'A',
        year: 1800,
        opus: { number: 'Op. 5' } as Opus
      });
      const compWithoutOpus = createComposition({
        title: 'B',
        year: 1800
      });

      const sorted = compositionSort([compWithoutOpus, compWithOpus]);
      expect(sorted).toEqual([compWithOpus, compWithoutOpus]);
    });

    it('should sort by year of writing (ascending order)', () => {
      const comp1800 = createComposition({
        title: 'A',
        year: 1800,
        opus: { number: 'Op. 5' } as Opus
      });
      const comp1810 = createComposition({
        title: 'B',
        year: 1810,
        opus: { number: 'Op. 5' } as Opus
      });
      const sorted = compositionSort([comp1810, comp1800]);
      expect(sorted).toEqual([comp1800, comp1810]);
    });

    it('should sort by opus number when years are equal', () => {
      const compOp10 = createComposition({
        title: 'A',
        year: 1800,
        opus: { number: 'Op. 10' } as Opus
      });
      const compOp20 = createComposition({
        title: 'B',
        year: 1800,
        opus: { number: 'Op. 20' } as Opus
      });
      const sorted = compositionSort([compOp20, compOp10]);
      expect(sorted).toEqual([compOp10, compOp20]);
    });

    it('should sort by bis flag when opus numbers are equal', () => {
      const compNoBis = createComposition({
        title: 'A',
        year: 1800,
        opus: { number: 'Op. 25' } as Opus
      });
      const compBis = createComposition({
        title: 'B',
        year: 1800,
        opus: { number: 'Op. 25 bis' } as Opus
      });

      const sorted = compositionSort([compBis, compNoBis]);
      expect(sorted).toEqual([compNoBis, compBis]);
    });

    it('should sort compositions in reverse order', () => {
      const comp1 = createComposition({
        title: 'Moonlight Sonata, 1st movement',
        year: 1801,
        opus: { number: 'Op. 25' } as Opus
      });
      const comp2 = createComposition({
        title: 'Moonlight Sonata, 1st movement',
        year: 1801
      });
      const comp3 = createComposition({
        title: 'Moonlight Sonata, 1st movement',
        year: 1801,
        opus: { number: 'Op. 25' } as Opus
      });
      const sorted = compositionSort([comp1, comp2, comp3], true);

      expect(sorted).toEqual([comp2, comp1, comp3]);
    });
  });
});
