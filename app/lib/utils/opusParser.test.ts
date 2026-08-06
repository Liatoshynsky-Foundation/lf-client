import { parseFullOpus, parseOpus } from './opusParser';

describe('opusParser', () => {
  describe('parseFullOpus', () => {
    it('should parse valid opus strings correctly', () => {
      expect(parseFullOpus('op. 3')).toEqual({ prefix: 'op', num: 3, rest: '' });
      expect(parseFullOpus('Op. 15 v2')).toEqual({ prefix: 'op', num: 15, rest: 'v2' });
      expect(parseFullOpus('sine op. 5')).toEqual({ prefix: 'sine op', num: 5, rest: '' });
      expect(parseFullOpus('sine op. 1 bis')).toEqual({ prefix: 'sine op', num: 1, rest: 'bis' });
      expect(parseFullOpus(42)).toEqual({ prefix: 'op', num: 42, rest: '' });
    });

    it('should return null for invalid formats or prefixes', () => {
      expect(parseFullOpus('bo. 3')).toBeNull();
      expect(parseFullOpus('b/o. 5')).toBeNull();
      expect(parseFullOpus('op.notanumber')).toBeNull();
      expect(parseFullOpus('op. 15 суфіксдовжиноюбільшедвадцятисимволів')).toBeNull();
      expect(parseFullOpus(undefined)).toBeNull();
      expect(parseFullOpus('')).toBeNull();
    });
  });

  describe('parseOpus', () => {
    it('should return numeric part of valid opus strings', () => {
      expect(parseOpus('op. 3')).toBe(3);
      expect(parseOpus('Op. 15 v2')).toBe(15);
      expect(parseOpus('sine op. 5')).toBe(5);
      expect(parseOpus('sine op. 1 bis')).toBe(1);
      expect(parseOpus(42)).toBe(42);
    });

    it('should return null for invalid opus strings', () => {
      expect(parseOpus('bo. 3')).toBeNull();
      expect(parseOpus('b/o. 5')).toBeNull();
      expect(parseOpus('op.notanumber')).toBeNull();
    });
  });
});
