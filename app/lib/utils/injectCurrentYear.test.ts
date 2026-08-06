import { injectCurrentYear } from './injectCurrentYear';

describe('injectCurrentYear', () => {
  it('replaces the {year} placeholder with the given year', () => {
    expect(injectCurrentYear('© {year} Foundation. All rights reserved.', 2026)).toBe(
      '© 2026 Foundation. All rights reserved.'
    );
  });

  it('replaces multiple occurrences of the placeholder', () => {
    expect(injectCurrentYear('{year}-{year}', 2026)).toBe('2026-2026');
  });

  it('defaults to the current year when no year is provided', () => {
    const currentYear = new Date().getFullYear();
    expect(injectCurrentYear('© {year} Foundation.')).toBe(`© ${currentYear} Foundation.`);
  });

  it('returns the input unchanged when there is no placeholder', () => {
    expect(injectCurrentYear('© 2025 Foundation.', 2026)).toBe('© 2025 Foundation.');
  });

  it('returns an empty string for falsy input', () => {
    expect(injectCurrentYear('', 2026)).toBe('');
  });
});
