import { escapeRegex } from './escapeRegex';

describe('escapeRegex', () => {
  it('should escape special regex characters', () => {
    expect(escapeRegex('hello.world+?')).toBe('hello\\.world\\+\\?');
    expect(escapeRegex('[js]')).toBe('\\[js\\]');
  });

  it('should return an empty string if input is empty', () => {
    expect(escapeRegex('')).toBe('');
  });
});
