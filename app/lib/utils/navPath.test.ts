import { isPathWithin, normalizePath } from './navPath';

type NormalizeInput = Parameters<typeof normalizePath>[0];

interface NormalizeCase {
  name: string;
  input: NormalizeInput;
  expected: string;
}

const normalizeCases: NormalizeCase[] = [
  { name: 'null becomes root', input: null, expected: '/' },
  { name: 'undefined becomes root', input: undefined, expected: '/' },
  { name: 'empty string becomes root', input: '', expected: '/' },

  { name: '"/uk" becomes root', input: '/uk', expected: '/' },
  { name: '"/uk/" becomes root', input: '/uk/', expected: '/' },
  { name: '"/uk/about-us" strips locale', input: '/uk/about-us', expected: '/about-us' },

  { name: '"/en" becomes root', input: '/en', expected: '/' },
  { name: '"/en/" becomes root', input: '/en/', expected: '/' },
  { name: '"/en/news/latest" strips locale', input: '/en/news/latest', expected: '/news/latest' },

  { name: '"archive" gets leading slash', input: 'archive', expected: '/archive' },
  { name: '"archive/" trims and adds slash', input: 'archive/', expected: '/archive' },
  { name: '"archive/fundId" becomes nested path', input: 'archive/fundId', expected: '/archive/fundId' },

  { name: '"/" stays root', input: '/', expected: '/' },
  { name: '"/archive/" trims trailing slash', input: '/archive/', expected: '/archive' },
  { name: '"/archive/fundId/" trims trailing slash', input: '/archive/fundId/', expected: '/archive/fundId' },

  { name: '"/archives" is not trimmed', input: '/archives', expected: '/archives' },
  { name: '"/newsletter" is not trimmed', input: '/newsletter', expected: '/newsletter' }
];

describe('normalizePath', () => {
  it.each(normalizeCases)('$name', ({ input, expected }) => {
    expect(normalizePath(input)).toBe(expected);
  });
});

interface WithinCase {
  name: string;
  root: string;
  current: string;
  expected: boolean;
}

const withinCases: WithinCase[] = [
  { name: 'root vs root', root: '/', current: '/', expected: true },
  { name: 'root vs /uk locale index', root: '/', current: '/uk', expected: true },
  { name: 'root vs /en locale index', root: '/', current: '/en', expected: true },
  { name: 'root does not match subpage', root: '/', current: '/about-us', expected: false },

  { name: 'exact /archive', root: '/archive', current: '/archive', expected: true },
  { name: 'exact /news', root: '/news', current: '/news', expected: true },

  { name: 'archive → fund', root: '/archive', current: '/archive/fundId', expected: true },
  { name: 'archive → fund/case', root: '/archive', current: '/archive/fundId/caseId', expected: true },
  { name: 'news → latest', root: '/news', current: '/news/latest', expected: true },
  { name: 'news → latest/today', root: '/news', current: '/news/latest/today', expected: true },

  { name: 'archive with locale', root: '/archive', current: '/uk/archive', expected: true },
  { name: 'archive nested with locale + slash', root: '/archive', current: '/uk/archive/fundId/', expected: true },
  { name: 'news nested with locale + slash', root: '/news', current: '/en/news/latest/', expected: true },

  { name: 'shorter current path does not match', root: '/archive/fund', current: '/archive', expected: false },
  { name: 'same depth matches', root: '/archive/fund', current: '/archive/fund', expected: true },
  { name: 'longer path under same root matches', root: '/archive/fund', current: '/archive/fund/case', expected: true },

  { name: 'archive vs archives', root: '/archive', current: '/archives', expected: false },
  { name: 'news vs newsletter', root: '/news', current: '/newsletter', expected: false },
  { name: 'about-us vs about', root: '/about-us', current: '/about', expected: false },

  { name: 'normalized root with locale', root: '/uk/archive', current: '/archive/fundId', expected: true },
  { name: 'root without leading slash', root: 'archive', current: '/uk/archive/fundId', expected: true }
];

describe('isPathWithin', () => {
  it.each(withinCases)('$name', ({ root, current, expected }) => {
    expect(isPathWithin(root, current)).toBe(expected);
  });
});
