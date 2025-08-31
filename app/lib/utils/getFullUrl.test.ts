import { getFullUrl } from './getFullUrl';

describe('getFullUrl', () => {
  it('should replace dynamic parameters in pathname', () => {
    const url = getFullUrl({
      pathname: '/api/user/[id]/profile',
      parameters: { id: '123' }
    });

    expect(url).toBe('/api/user/123/profile');
  });

  it('should add simple query parameters', () => {
    const url = getFullUrl({
      pathname: '/api/data',
      searchParameters: {
        page: 2,
        active: true
      }
    });

    expect(url).toBe('/api/data?page=2&active=true');
  });

  it('should add array query parameters', () => {
    const url = getFullUrl({
      pathname: '/api/items',
      searchParameters: {
        tags: ['a', 'b']
      }
    });

    expect(url).toBe('/api/items?tags=a&tags=b');
  });

  it('should skip null and undefined values', () => {
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

  it('should return pathname if no parameters or searchParameters provided', () => {
    const url = getFullUrl({
      pathname: '/api/static'
    });

    expect(url).toBe('/api/static');
  });

  it('should replace multiple dynamic segments', () => {
    const url = getFullUrl({
      pathname: '/api/[type]/[id]',
      parameters: { type: 'user', id: '456' }
    });

    expect(url).toBe('/api/user/456');
  });
});
