import { getTokenFromHeader } from './getTokenFromHeader';

describe('getTokenFromHeader', () => {
  it('should return token when Authorization header is valid', () => {
    const token = 'my-secret-token';
    const request = {
      headers: new Headers({
        authorization: `Bearer ${token}`
      })
    };

    const result = getTokenFromHeader(request);
    expect(result).toBe(token);
  });

  it('should return null when Authorization header is missing', () => {
    const request = {
      headers: new Headers()
    };

    const result = getTokenFromHeader(request);
    expect(result).toBeNull();
  });

  it('should return null when Authorization header does not start with Bearer', () => {
    const request = {
      headers: new Headers({
        authorization: 'Token my-token'
      })
    };

    const result = getTokenFromHeader(request);
    expect(result).toBeNull();
  });
});
