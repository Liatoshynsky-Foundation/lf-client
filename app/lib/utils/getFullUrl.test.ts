import { getFullUrl } from './getFullUrl';

describe('getFullUrl', () => {
  it('replaces dynamic parameters in pathname', () => {
    const url = getFullUrl({
      pathname: '/api/user/[id]/profile',
      parameters: { id: '123' }
    });

    expect(url).toBe('/api/user/123/profile');
  });

  it('adds simple query parameters', () => {
    const url = getFullUrl({
      pathname: '/api/data',
      searchParameters: {
        page: 2,
        active: true
      }
    });

    expect(url).toBe('/api/data?page=2&active=true');
  });

  it('adds array query parameters', () => {
    const url = getFullUrl({
      pathname: '/api/items',
      searchParameters: {
        tags: ['a', 'b']
      }
    });

    expect(url).toBe('/api/items?tags%5B0%5D=a&tags%5B1%5D=b');
  });

  it('adds object query parameters', () => {
    const url = getFullUrl({
      pathname: '/api/filter',
      searchParameters: {
        range: { min: 5, max: 10 }
      }
    });

    expect(url).toBe('/api/filter?range%5Bmin%5D=5&range%5Bmax%5D=10');
  });

  it('skips null and undefined values', () => {
    const url = getFullUrl({
      pathname: '/api/test',
      searchParameters: {
        present: 'value',
        missing: null,
        alsoMissing: undefined
      }
    });

    expect(url).toBe('/api/test?present=value');
  });

  it('returns pathname if no parameters or searchParameters provided', () => {
    const url = getFullUrl({
      pathname: '/api/static'
    });

    expect(url).toBe('/api/static');
  });

  it('replaces multiple dynamic segments', () => {
    const url = getFullUrl({
      pathname: '/api/[type]/[id]',
      parameters: { type: 'user', id: '456' }
    });

    expect(url).toBe('/api/user/456');
  });
});
