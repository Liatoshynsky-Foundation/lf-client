import { normalizeSearch } from './normalizeSearch';

describe('normalizeSearch', () => {
  it('removes leading and trailing spaces', () => {
    expect(normalizeSearch('  Hello world  ')).toBe('Hello world');
  });

  it('removes multiple inner spaces', () => {
    expect(normalizeSearch('Hello    world')).toBe('Hello world');
  });

  it('returns empty string for spaces only', () => {
    expect(normalizeSearch('     ')).toBe('');
  });

  it('handles empty string', () => {
    expect(normalizeSearch('')).toBe('');
  });
});
