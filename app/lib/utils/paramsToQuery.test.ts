import { tableParamsToQuery } from './paramsToQuery';

describe('tableParamsToQuery', () => {
  it('returns empty string when params is empty', () => {
    expect(tableParamsToQuery({})).toBe('');
  });

  it('returns empty string when all values are null', () => {
    expect(
      tableParamsToQuery({
        a: null,
        b: null
      })
    ).toBe('');
  });

  it('serializes primitive values', () => {
    expect(
      tableParamsToQuery({
        q: 'hello',
        page: 2
      })
    ).toBe('?q=hello&page=2');
  });

  it('keeps 0 and empty string (only skips null)', () => {
    expect(
      tableParamsToQuery({
        page: 0,
        q: ''
      })
    ).toBe('?page=0&q=');
  });

  it('skips empty arrays', () => {
    expect(
      tableParamsToQuery({
        tags: [],
        q: 'x'
      })
    ).toBe('?q=x');
  });

  it('expands arrays into repeated query params', () => {
    expect(
      tableParamsToQuery({
        tags: ['a', 'b', 'c']
      })
    ).toBe('?tags=a&tags=b&tags=c');
  });

  it('works with mixed primitives and arrays and ignores null fields', () => {
    expect(
      tableParamsToQuery({
        q: 'test',
        page: 1,
        tags: ['x', 'y'],
        ignored: null
      })
    ).toBe('?q=test&page=1&tags=x&tags=y');
  });

  it('URL-encodes keys and values (spaces, &, =, unicode)', () => {
    expect(
      tableParamsToQuery({
        'a b': 'x&y=z',
        city: 'Львів'
      })
    ).toBe(`?a%20b=${encodeURIComponent('x&y=z')}&city=${encodeURIComponent('Львів')}`);
  });

  it('stringifies array items (numbers, null become strings) based on current implementation', () => {
    expect(
      tableParamsToQuery({
        ids: [1, 2, 3] as any,
        weird: [null] as any
      })
    ).toBe('?ids=1&ids=2&ids=3&weird=null');
  });

  it('returns leading "?" and joins with "&" without trailing separators', () => {
    const res = tableParamsToQuery({ a: '1', b: '2' });
    expect(res.startsWith('?')).toBe(true);
    expect(res).toBe('?a=1&b=2');
    expect(res.endsWith('&')).toBe(false);
  });
});
