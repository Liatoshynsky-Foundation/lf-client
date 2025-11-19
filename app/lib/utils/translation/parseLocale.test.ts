import { parseLocale } from './parseLocale';

describe('parseLocale', () => {
  const cases: Array<[string, string, 'uk' | 'en']> = [
    ['return "uk" when no locale param is present', '', 'uk'],
    ['return "en" when locale=en', 'locale=en', 'en'],
    ['return "uk" when locale=uk', 'locale=uk', 'uk'],
    ['default to "uk" for invalid locale values', 'locale=fr', 'uk'],
    ['treat empty locale value as default "uk"', 'locale=', 'uk']
  ];

  it.each(cases)('should %s', (_desc, query, expected) => {
    const params = new URLSearchParams(query);
    expect(parseLocale(params)).toBe(expected);
  });
});
