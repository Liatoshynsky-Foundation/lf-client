import { formatTextWithHyphens } from './textFormater';

describe('formatTextWithHyphens', () => {
  it('should return an empty string for null, undefined, or empty input', () => {
    expect(formatTextWithHyphens(null, 10)).toBe('');
    expect(formatTextWithHyphens(undefined, 10)).toBe('');
    expect(formatTextWithHyphens('', 10)).toBe('');
  });

  it('should not modify text that is shorter than maxLength', () => {
    expect(formatTextWithHyphens('hello', 10)).toBe('hello');
    expect(formatTextWithHyphens('op. 3', 10)).toBe('op. 3');
  });

  it('should wrap words to new lines if they exceed maxLength when combined', () => {
    expect(formatTextWithHyphens('hello world', 7)).toBe('hello\nworld');
    expect(formatTextWithHyphens('op. 3 bis', 10)).toBe('op. 3 bis');
    expect(formatTextWithHyphens('op. 3 bis', 6)).toBe('op. 3\nbis');
  });

  it('should hyphenate words that are longer than maxLength', () => {
    expect(formatTextWithHyphens('superlongword', 10)).toBe('superlong-\nword');
    expect(formatTextWithHyphens('extraordinary', 5)).toBe('extr-\naord-\ninary');
  });

  it('should handle combination of wrapping and hyphenation', () => {
    expect(formatTextWithHyphens('op. 3 дужедовгийтекст', 10)).toBe('op. 3\nдужедовги-\nйтекст');
  });
});
