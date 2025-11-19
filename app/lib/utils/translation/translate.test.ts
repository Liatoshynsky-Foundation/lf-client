import type { Locale } from 'next-intl';

import translate from './translate';

describe('translate', () => {
  const en: Locale = 'en';
  const uk: Locale = 'uk';

  it('should resolve a top-level locale object', () => {
    const src = { title: { en: 'Hello', uk: 'Привіт' } };
    const out = translate(src, en);
    expect(out).toEqual({ title: 'Hello' });
  });

  it('should resolve deeply nested locale objects', () => {
    const src = {
      post: {
        header: { en: 'Hi', uk: 'Вітаю' },
        body: {
          paragraphs: [
            { en: 'First', uk: 'Перший' },
            { en: 'Second', uk: 'Другий' }
          ]
        }
      },
      meta: { count: 2 }
    };
    const out = translate(src, uk);
    expect(out).toEqual({
      post: {
        header: 'Вітаю',
        body: {
          paragraphs: ['Перший', 'Другий']
        }
      },
      meta: { count: 2 }
    });
  });

  it('should translate arrays of locale objects', () => {
    const src = {
      items: [
        { en: 'A', uk: 'А' },
        { en: 'B', uk: 'Б' }
      ]
    };
    const out = translate(src, en);
    expect(out).toEqual({ items: ['A', 'B'] });
  });

  it('should leave primitives and non-locale objects unchanged', () => {
    const src = {
      n: 42,
      flag: true,
      obj: { foo: 'bar' },
      maybe: null
    };
    const out = translate(src, uk);
    expect(out).toEqual(src);
  });

  it('should treat objects that do not contain both en and uk as normal objects', () => {
    const src = { ambig: { en: 'OnlyEn' }, full: { en: 'E', uk: 'U' } };
    const out = translate(src, en);
    expect(out).toEqual({ ambig: { en: 'OnlyEn' }, full: 'E' });
  });

  it('should not mutate the source object', () => {
    const src = {
      a: { en: 'X', uk: 'Y' },
      b: [{ en: 'P', uk: 'Q' }]
    };

    // Sonnar may suggest structuredClone, but its a `window` method
    // so its not accessible during tests
    const copy = JSON.parse(JSON.stringify(src));
    translate(src, en);
    expect(src).toEqual(copy);
  });

  it('should handle an empty object', () => {
    const src: Record<string, unknown> = {};
    expect(translate(src, uk)).toEqual({});
  });
});
